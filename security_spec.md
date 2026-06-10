# Security Specifications - Las Bugambilias Firestore Security

## 1. Data Invariants

### Lead Entity Invariants:
- **Completeness**: Any created lead document must contain exactly the 15 required fields: `nombres`, `apellidos`, `email`, `telefono`, `tipoDocumento`, `numeroDocumento`, `mensaje`, `politicaTerminos`, `politicaPublicidad`, `politicaPerfilamiento`, `timestamp`, `status`, `origen`, `dispositivo`, `loteInteres`.
- **String Sizes**: All personal data strings (names, email, identification documents, etc.) must have size limit constraints to prevent Denial-of-Wallet payload size exhaustion.
- **Form Constraints**: `politicaTerminos`, `politicaPublicidad`, and `politicaPerfilamiento` must be explicit boolean values.
- **Workflow / Status Integrity**: When a lead is initially created, its status MUST be 'Nuevo'. No user can create a lead in any other status.
- **Immutable Keys**: Once a lead is created, its core reference identifiers (such as the document itself, email, and identifications) are immutable. Only standard workflow statuses can be changed with explicit limited-field updates.

### SiteImages (Settings) Entity Invariants:
- **Key Validity**: Only allowed image keys can be mutated as separate document records on settings (`heroBanner`, `mapPlan`, `testimonialsFamily`, `related1Huacho`, `related2Planicie`, `related3SantaClara`).
- **Data Shape consistency**:
  - Individual setting keys must conform to having exactly a `value` (string URL or base64) to prevent junk/malicious attributes.
  - Legacy `images` document under setting keys must only map properties conforming to valid image URLs/keys.

---

## 2. The "Dirty Dozen" Attack Payloads

The following payloads represent real attempts to compromise the system's security. Active rules must explicitly deny all of these.

### 1. Lead Identity Spoofing / Unauthorized Read
- **Description**: An unauthenticated attacker attempts to read all captured prospect leads to extract PII (emails, phone numbers, identification documents).
- **Target**: `GET /leads`
- **Result**: `PERMISSION_DENIED`

### 2. Lead Self-Assigned Status Override on Creation
- **Description**: A malicious request tries to bypass CRM registration states by creating a lead directly as 'Cerrado Ganado' or 'Contactado'.
- **Payload**:
  ```json
  {
    "nombres": "Anarquista",
    "apellidos": "Hacker",
    "email": "hacker@domain.com",
    "telefono": "999888777",
    "tipoDocumento": "DNI",
    "numeroDocumento": "00000000",
    "mensaje": "Hack",
    "politicaTerminos": true,
    "politicaPublicidad": true,
    "politicaPerfilamiento": true,
    "timestamp": "2026-06-10T17:26:00Z",
    "status": "Cerrado Ganado",
    "origen": "Web",
    "dispositivo": "Mobile",
    "loteInteres": null
  }
  ```
- **Result**: `PERMISSION_DENIED` (status must be 'Nuevo' on create).

### 3. Lead Resource Poisoning / Extreme Field String Value
- **Description**: Attacker tries to inject a 5MB base64 block into the client's full name field to trigger massive Firestore storage bills.
- **Payload**:
  ```json
  {
    "nombres": "<5MB_BASE64_JUNK_DATA>",
    ...
  }
  ```
- **Result**: `PERMISSION_DENIED` (nombres size must be <= 200).

### 4. Lead Attribute Missing / Schema Anti-Update-Gap Bypass
- **Description**: Attempt to insert a lead document lacking critical attributes like `politicaTerminos` or `email` fields.
- **Payload**:
  ```json
  {
    "nombres": "Incompleto",
    "apellidos": "Lead",
    "telefono": "999888777",
    "status": "Nuevo"
  }
  ```
- **Result**: `PERMISSION_DENIED` (all 15 keys are strictly mandatory).

### 5. Lead Shadow Key Injection (Ghost Field Protection)
- **Description**: Attempt to inject custom control attributes such as `isAdmin: true` or `vipClient: true` inside a lead document during creation to trick administrative panels.
- **Payload**:
  ```json
  {
    "nombres": "Fake",
    "apellidos": "VIP",
    "email": "user@gmail.com",
    "telefono": "999888777",
    "tipoDocumento": "DNI",
    "numeroDocumento": "00000000",
    "mensaje": "",
    "politicaTerminos": true,
    "politicaPublicidad": true,
    "politicaPerfilamiento": true,
    "timestamp": "2026-06-10T17:26:00Z",
    "status": "Nuevo",
    "origen": "Web",
    "dispositivo": "Mobile",
    "loteInteres": null,
    "isAdmin": true
  }
  ```
- **Result**: `PERMISSION_DENIED` (exact key matched list size of 15 keys).

### 6. Lead Unauthorized Edit of Immutable fields
- **Description**: Attacker attempts to change the phone number or DNI associated with a previously submitted lead.
- **Attempt**:
  ```json
  {
    "telefono": "999555111"
  }
  ```
- **Result**: `PERMISSION_DENIED` (only `status` is allowed to be modified under update actions).

### 7. Lead Non-Conforming Identification Type Injection
- **Description**: Attacker attempts to input garbage identification type like string "SUPER_USER_ID" to corrupt database queries.
- **Payload**:
  ```json
  {
    ...
    "tipoDocumento": "SUPER_USER_ID"
    ...
  }
  ```
- **Result**: `PERMISSION_DENIED` (tipoDocumento size <= 50).

### 8. Settings Public Deletion Attempt
- **Description**: Public guest attempts to delete site layout settings or images.
- **Target**: `DELETE /settings/heroBanner`
- **Result**: `PERMISSION_DENIED` (settings can only be read public, write or delete should be restricted/validated).

### 9. Settings Shadow Field Injection
- **Description**: Attacker attempts to inject malicious secondary parameters `redirectUrl: "https://phishing.site"` inside a SiteImage configuration settings document.
- **Payload**:
  ```json
  {
    "value": "https://validurl.png",
    "updatedAt": "2026-06-10T17:26:00Z",
    "redirectUrl": "https://phishing.site"
  }
  ```
- **Result**: `PERMISSION_DENIED` (settings updates must conform strictly to `value` and `updatedAt` properties, total size 2).

### 10. Settings Massive URL Size Injection
- **Description**: Attacker attempts to upload a 30MB nested array or binary payload instead of a base64 image or image URL.
- **Payload**:
  ```json
  {
    "value": [ ...30MB nested array... ],
    "updatedAt": "2026-06-10"
  }
  ```
- **Result**: `PERMISSION_DENIED` (value must be a string <= 2000000).

### 11. Settings Corrupt Keys Write
- **Description**: Attacker attempts to create unstructured keys inside settings collection (e.g., `settings/maliciousField`).
- **Payload**:
  ```json
  {
    "value": "malicious",
    "updatedAt": "2026-06-10T17:26:00Z"
  }
  ```
- **Result**: `PERMISSION_DENIED` (setting document updates must be valid SiteImage documents).

### 12. Lead Deletion / Deleting client submissions publicly
- **Description**: Random guest attempts to delete captured leads.
- **Target**: `DELETE /leads/anyLeadId`
- **Result**: `PERMISSION_DENIED`

---

## 3. Test Runner Definition: firestore.rules.test.ts

```typescript
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "smooth-cosmos-t6vd8",
    firestore: {
      rules: require("fs").readFileSync("firestore.rules", "utf8"),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("Zero-Trust Firestore Security Fortress Rules", () => {
  // Test cases that align with the Dirty Dozen Attack Payloads
  it("forces leads to be read-restricted or protected", async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDocs(unauthDb.collection("leads")));
  });

  it("denies lead creation if status is not 'Nuevo'", async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      setDoc(doc(unauthDb, "leads", "lead_test_1"), {
        nombres: "Abel",
        apellidos: "Alvarez",
        email: "abel@gmail.com",
        telefono: "963852741",
        tipoDocumento: "DNI",
        numeroDocumento: "12345678",
        mensaje: "",
        politicaTerminos: true,
        politicaPublicidad: true,
        politicaPerfilamiento: true,
        timestamp: "2026-06-10T17:26:00Z",
        status: "Contactado", // Invalid state on create
        origen: "Web",
        dispositivo: "Desktop",
        loteInteres: null,
      })
    );
  });

  it("denies settings updates with ghost/malicious fields", async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      setDoc(doc(unauthDb, "settings", "heroBanner"), {
        value: "https://sample.png",
        updatedAt: "2026-06-10",
        maliciousParam: "ghost_value",
      })
    );
  });
});
```
