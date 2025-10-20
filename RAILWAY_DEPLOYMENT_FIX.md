# Guida: Fix Railway Deployment per NIDF Dashboard

## 🎯 Obiettivo
Far funzionare https://nec-production.up.railway.app/?industry=sebino deployando correttamente il progetto Vite (non Next.js).

---

## 📋 STEP 1: Verifica Configurazione Attuale

### 1.1 Accedi a Railway Dashboard
1. Vai su https://railway.app
2. Login con il tuo account
3. Dovresti vedere il progetto **"nec-production"** o simile

### 1.2 Identifica il Servizio
1. Click sul progetto **"nec-production"**
2. Dovresti vedere uno o più servizi (boxes)
3. Click sul servizio principale (quello che sta deployando)

### 1.3 Verifica Repository Connesso
1. Nella schermata del servizio, cerca la sezione **"Settings"** (ingranaggio in alto a destra)
2. Vai su **"Source"** o **"Service Source"**
3. **IMPORTANTE**: Controlla quale repository è connesso

**✅ Configurazione CORRETTA:**
```
Repository: dariomelpignano/nec
Branch: main
Root Directory: / (o vuoto)
```

**❌ Configurazione ERRATA (se vedi questo):**
```
Repository: [qualsiasi altro] / quantreal-demo
Branch: [qualsiasi]
```

---

## 🔧 STEP 2A: Fix Repository (Se Collegato al Repo Sbagliato)

### 2A.1 Disconnetti Repository Sbagliato
1. Settings → Service Source
2. Click su **"Disconnect"** o **"Remove Source"**
3. Conferma la disconnessione

### 2A.2 Riconnetti Repository Corretto
1. Click su **"Connect GitHub Repo"** o **"Add Source"**
2. Se richiesto, autorizza Railway ad accedere a GitHub
3. Cerca e seleziona: **`dariomelpignano/nec`**
4. Branch: **`main`**
5. Root Directory: **lascia VUOTO** o metti **`/`**
6. Click su **"Connect"** o **"Add"**

### 2A.3 Configura Build Settings
1. Settings → **"Build"** section
2. **Build Command**: `npm run build`
3. **Start Command**: `npm run start`
4. **Install Command**: `npm ci` (o lascia default)
5. Salva le modifiche

### 2A.4 Trigger Deploy
1. Vai su **"Deployments"** tab
2. Click su **"Deploy"** button in alto a destra
3. Seleziona **"Trigger Deploy"** o **"Deploy Latest Commit"**
4. Aspetta 2-3 minuti per il build

---

## 🆕 STEP 2B: Crea Nuovo Servizio (Alternativa Raccomandata)

Se lo STEP 2A non funziona o è troppo complicato, **meglio ricreare da zero**:

### 2B.1 Elimina il Servizio Esistente (Opzionale ma Raccomandato)
1. Vai sul servizio attuale
2. Settings → **"Danger Zone"** (in fondo alla pagina)
3. Click su **"Remove Service"**
4. Conferma eliminazione
5. **NOTA**: Questo NON elimina il progetto, solo questo servizio

### 2B.2 Crea Nuovo Servizio
1. Torna alla dashboard principale del progetto "nec-production"
2. Click su **"+ New"** o **"Add Service"**
3. Seleziona **"GitHub Repo"**

### 2B.3 Configura Nuovo Servizio
1. **Select Repository**: `dariomelpignano/nec`
2. **Branch**: `main`
3. Click su **"Add Service"**

### 2B.4 Railway Auto-Detect (Attendi)
Railway dovrebbe auto-rilevare che è un progetto Vite grazie al file `nixpacks.toml` che abbiamo creato.

Se chiede configurazione manuale:
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

### 2B.5 Deploy Automatico
Railway dovrebbe partire automaticamente con il primo deploy. Aspetta 2-3 minuti.

---

## 🔍 STEP 3: Verifica Deploy Logs

### 3.1 Monitora Build
1. Vai su **"Deployments"** tab
2. Click sull'ultimo deployment (dovrebbe essere "In Progress" o "Success")
3. Guarda i **"Build Logs"**

**✅ Log CORRETTI da vedere:**
```
Installing Node.js 20...
Running npm ci...
Running npm run build...
> nidf-dashboard@0.0.0 build
> tsc -b && vite build
✓ built in X seconds
```

**❌ Log ERRATI da NON vedere:**
```
> quantreal-demo@1.0.0 start
> next start
```

### 3.2 Monitora Deploy Logs
1. Dopo il build, vai su **"Deploy Logs"**

**✅ Log CORRETTI:**
```
> nidf-dashboard@0.0.0 start
> vite preview --host 0.0.0.0 --port 8080

  ➜  Local:   http://0.0.0.0:8080/
  ➜  Network: http://10.x.x.x:8080/
```

### 3.3 Ottieni URL di Deploy
1. Railway assegnerà un URL automaticamente
2. Dovrebbe essere tipo: `https://nec-production.up.railway.app`
3. Copia l'URL

---

## ✅ STEP 4: Test Finale

### 4.1 Test Dashboard Principale
Apri: `https://[tuo-url-railway].up.railway.app`

Dovresti vedere la dashboard NIDF principale (manifattura).

### 4.2 Test Dashboard RBM
Apri: `https://[tuo-url-railway].up.railway.app/?industry=rbm`

Dovresti vedere la dashboard RBM.

### 4.3 Test Dashboard Sebino ⭐
Apri: `https://[tuo-url-railway].up.railway.app/?industry=sebino`

Dovresti vedere la dashboard Sebino ESG!

---

## 🚨 Troubleshooting

### Problema: Build Fallisce con "Module not found"

**Soluzione:**
1. Settings → Build
2. Assicurati che **Install Command** sia: `npm ci` (NON `npm install`)
3. Redeploy

### Problema: App Si Avvia ma Mostra Pagina Bianca

**Soluzione:**
1. Controlla che il build sia andato a buon fine
2. Verifica che la cartella `dist/` sia stata creata
3. In Deploy Logs, cerca errori JavaScript
4. Verifica che il **Start Command** sia: `npm run start`

### Problema: Railway Continua a Usare Next.js

**Soluzione:**
1. **ELIMINA il servizio completamente**
2. Ricrea da zero con STEP 2B
3. Assicurati di selezionare il repository `dariomelpignano/nec`

### Problema: 404 su /sebino Route

**Soluzione:**
Questo è normale! L'app è SPA (Single Page Application).
- ✅ Giusto: `https://app.url/?industry=sebino`
- ❌ Sbagliato: `https://app.url/sebino`

---

## 📞 Se Nulla Funziona

### Opzione 1: Controlla File Locali
Nel repository, assicurati che esistano:
- ✅ `/nixpacks.toml`
- ✅ `/package.json` con script `start`
- ✅ `/src/components/Sebino/` (componenti)
- ✅ `/src/data/sebino/` (dati)
- ✅ `/src/App.tsx` aggiornato con routing Sebino

### Opzione 2: Rebuild Locale e Test
```bash
cd /Users/dmelpi/Projects/nidf
npm run build
npm run start
```

Se funziona in locale, Railway dovrebbe funzionare allo stesso modo.

### Opzione 3: Condividi Screenshot
Se continua a non funzionare, condividi screenshot di:
1. Railway Settings → Service Source
2. Railway Deployments → Build Logs (primi 50 righe)
3. Railway Deployments → Deploy Logs (primi 50 righe)

---

## 🎯 Checklist Finale

Prima di considerare il deploy completato, verifica:

- [ ] Railway connesso a `dariomelpignano/nec` (NON quantreal-demo)
- [ ] Branch `main` selezionato
- [ ] Build logs mostrano `nidf-dashboard` (NON quantreal-demo)
- [ ] Deploy logs mostrano `vite preview` (NON `next start`)
- [ ] URL principale funziona (manufacturing dashboard)
- [ ] `?industry=rbm` funziona
- [ ] `?industry=sebino` funziona ⭐
- [ ] Nessun errore 404 o 500

---

## 📚 Risorse Utili

- Railway Docs: https://docs.railway.app/
- Nixpacks Docs: https://nixpacks.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html

---

*Documento creato con [Claude Code](https://claude.com/claude-code)*
*Ultima modifica: 2024-10-20*
