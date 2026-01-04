# lysz210.host 🚀

Questo repository ospita l'applicazione principale per **lysz210.me**. L'infrastruttura è completamente gestita come codice (IaC) e il deploy è automatizzato tramite una pipeline CI/CD.

## 🏗️ Architettura Stack
Il progetto utilizza un'architettura serverless su AWS per garantire massime prestazioni e costi minimi:

* **Hosting:** Amazon S3 (Static Website Hosting).
* **CDN:** Amazon CloudFront (per la distribuzione globale e HTTPS).
* **DNS:** Amazon Route 53.
* **Infrastructure as Code:** Terraform (HCP Terraform).
* **CI/CD:** GitHub Actions.



## 🛠️ Tecnologie Utilizzate
* **Node.js v24.x** (Runtime per la generazione degli asset)
* **Terraform** (Gestione infrastruttura)
* **OIDC (OpenID Connect)** (Autenticazione sicura tra GitHub e AWS senza chiavi statiche)

## 🚀 Pipeline di Deploy
Il deploy avviene automaticamente tramite GitHub Actions. La logica dei branch è la seguente:

1.  **develop (Default):** Branch di sviluppo. Ogni push su questo branch attiva il build per testare l'integrità del codice.
2.  **main:** Branch di produzione. Ogni merge su `main` attiva il deploy automatico sul bucket S3 e l'invalidazione della cache di CloudFront (solo per i file `.html`).
