# Règles de rédaction d'article - Blog Satellite Template

Ce fichier définit les règles strictes à suivre pour la rédaction de tout article de blog dans le système Blog Satellite. Ces règles sont obligatoires et s'appliquent à chaque article, quel que soit le client.

---

## Étape 0 — Avant de rédiger

1. **Lire ce fichier en entier** avant de commencer quoi que ce soit.
2. **Demander au rédacteur/utilisateur l'URL du domaine principal du client** (ex: `https://calais.agences-placid.com/`).
3. **Analyser le site du client** via cette URL : extraire le ton, les services, les arguments de vente, les chiffres affichés, la cible clientèle, la zone géographique.
4. **Ne jamais commencer la rédaction sans avoir analysé le domaine principal.**

---

## Structure de l'article

### H1 — Titre de l'article (= slug)

- Le H1 est **le titre de l'article** saisi dans le gestionnaire de blog. Il est affiché automatiquement par l'app, ne pas le réécrire dans le contenu.
- Le titre sert **aussi de slug** (généré automatiquement depuis le titre). Il doit donc rester **court et percutant** tout en étant optimisé SEO.
- **Contrainte slug** : le titre doit idéalement faire **8 à 12 mots maximum** pour produire un slug lisible et efficace. Pas de titre-fleuve.
- Le titre **doit être optimisé longue traîne** : il cible une requête précise que les utilisateurs tapent sur Google.
- Exemples :
  - BON : `Gestion locative Calais : loyer garanti sans commission` → slug court et mot-clé en premier
  - BON : `Conciergerie Airbnb Biarritz : maximisez vos revenus locatifs` → slug compact, mot-clé principal en tête
  - MAUVAIS : `Conciergerie Airbnb à Biarritz : comment maximiser vos revenus locatifs sans y passer vos soirées` → slug beaucoup trop long
  - MAUVAIS : `Notre service de gestion` → pas de mot-clé, trop générique
  - MAUVAIS : `Bienvenue sur notre blog` → aucune valeur SEO

### H2 — Sections principales (premier niveau dans le contenu rédigé)

- Puisque le H1 est géré automatiquement par l'app, **le contenu rédigé commence directement par un paragraphe d'introduction puis des H2**. Ne jamais écrire de H1 dans le corps de l'article.

### H2 — Sections principales

- Les `##` sont les grandes sections de l'article.
- Chaque H2 doit contenir un **mot-clé secondaire ou une variante longue traîne** quand c'est naturel.
- Pas de H2 générique type "Introduction" ou "Conclusion".

### H3 — Sous-sections

- Les `###` détaillent les H2.
- Utiliser des H3 pour structurer les listes d'avantages, les étapes, les comparatifs, les questions FAQ.

---

## SEO — Métadonnées obligatoires

Chaque article doit inclure **en commentaire HTML en haut du fichier** :

```html
<!--
Meta Title (max 60 caractères) :
[Titre optimisé avec mot-clé principal + nom du client/marque]

Meta Description (max 155 caractères) :
[Description incitative avec mot-clé principal, bénéfice client, call-to-action]

Courte description (max 2 lignes) :
[Résumé court affiché sur la carte article dans le catalogue. Doit donner envie de cliquer.]

Slug suggéré :
[slug-en-minuscules-avec-tirets]

Mot-clé principal : [ex: gestion locative Calais]
Mots-clés secondaires : [ex: location courte durée, loyer garanti, sous-location professionnelle]
-->
```

### Règles SEO

- **Meta Title** : max 60 caractères, contient le mot-clé principal, le nom de la marque ou la ville.
- **Meta Description** : max 155 caractères, phrase incitative, contient le mot-clé principal, donne envie de cliquer.
- **Courte description** : max 2 lignes (~150 caractères), c'est le texte affiché sur la carte article dans le catalogue/listing. Doit être accrocheur et résumer l'intérêt de l'article en un coup d'oeil.
- **Slug** : généré depuis le H1, en minuscules, mots séparés par des tirets, pas de mots vides inutiles.
- **Mots-clés** : intégrés naturellement dans les H2, H3, le premier paragraphe, et la FAQ.

---

## Contenu — Règles strictes

### Volume

- L'article doit faire entre **2000 et 2250 mots**.
- Vérifier le nombre de mots avant de livrer.

### Fiabilité de l'information — RÈGLE ABSOLUE

> **RIEN NE DOIT ÊTRE INVENTÉ. AUCUNE EXCEPTION.**

- **Toutes les informations sur le client** (services, chiffres, fonctionnement, équipe, témoignages) doivent provenir **exclusivement du domaine principal** analysé à l'étape 0.
- **Aucun faux avis**, aucune fausse citation, aucun témoignage inventé.
- **Aucun chiffre inventé** (pas de "revenus estimés", pas de "X € par mois" sauf si c'est affiché sur le site du client).
- **Les données externes sont autorisées** uniquement si elles sont factuelles et vérifiables, et qu'elles **soutiennent le contenu principal**. Exemples autorisés :
  - Commissions des plateformes OTA (Airbnb, Booking) = données publiques
  - Données géographiques ou économiques d'une ville = faits vérifiables
  - Statistiques sectorielles issues de sources publiques
- **Exemples interdits** :
  - "Un T2 à Calais rapporte entre 800 et 1 500 €/mois" (inventé)
  - "J'aurais aimé connaître X plus tôt" (faux témoignage)
  - "Revenu net estimé : -30 à -40 %" (chiffre sorti de nulle part)

### Ton et registre

- **Professionnel** : c'est un article pour un client, pas un post de blog perso.
- **Accessible** : pas de jargon technique non expliqué.
- **Orienté conversion** : chaque section doit amener le lecteur vers l'action (contact, estimation, etc.).
- Pas d'emojis sauf demande explicite du client.

---

## CTA — Appels à l'action

**3 CTA obligatoires**, positionnés stratégiquement :

| Position | Placement exact | Objectif |
|----------|----------------|----------|
| **Haut** | Après le paragraphe d'introduction | Attraper les lecteurs pressés |
| **Milieu** | Après la section comparatif ou avantages | Relancer après la démonstration de valeur |
| **Bas** | Avant la FAQ, en clôture de l'article | Convertir les lecteurs convaincus |

### Format des CTA

```markdown
**[Texte incitatif du CTA →](URL_DU_DOMAINE_PRINCIPAL)**
```

- Le texte doit être **incitatif et spécifique** (pas de "Cliquez ici").
- L'URL pointe vers le **domaine principal du client**.
- Varier les formulations entre les 3 CTA.
- Exemples :
  - `**[Demandez votre estimation gratuite de loyer garanti →](https://example.com/)**`
  - `**[Découvrez combien votre bien peut vous rapporter →](https://example.com/)**`
  - `**[Contactez l'équipe Example dès maintenant →](https://example.com/)**`

---

## Images

### Quantité

- **Maximum 3 images** par article.
- Minimum recommandé : 2 (une cover + une CTA ou illustration).

### Emplacements suggérés

1. **Image cover** : juste après le sous-titre d'accroche, en haut de l'article.
2. **Image milieu** (optionnelle) : pour illustrer un comparatif, un schéma, ou une section clé.
3. **Image CTA** (optionnelle) : avant le dernier call-to-action.

### Suggestions de recherche — OBLIGATOIRE

- Pour chaque image, le rédacteur doit fournir **une suggestion de recherche** à utiliser sur une banque d'images (Unsplash, Pexels, etc.).
- La suggestion doit être en **anglais** (les banques d'images indexent principalement en anglais).
- Elle doit décrire précisément le type de visuel attendu, en lien avec le contenu de la section.
- Format dans le commentaire HTML en haut de l'article :

```
Suggestions images :
- Cover : [recherche en anglais] — [emplacement dans l'article]
- Milieu : [recherche en anglais] — [emplacement dans l'article]
- CTA (optionnelle) : [recherche en anglais] — [emplacement dans l'article]
```

### Format dans le markdown

```markdown
![Texte alt descriptif et optimisé SEO][image-cover]
*Légende de l'image en italique.*
```

### Alt text — Règles

- L'alt text doit être **descriptif** : décrire ce que montre l'image.
- L'alt text doit être **optimisé SEO** : intégrer naturellement un mot-clé ou la localisation.
- L'alt text ne doit **pas être du keyword stuffing**.
- Exemples :
  - BON : `Vue aérienne du port de Calais avec les ferries transmanche`
  - BON : `Tableau comparatif des solutions de gestion locative à Calais`
  - MAUVAIS : `image1`
  - MAUVAIS : `gestion locative Calais loyer garanti commission Placid SEO`

---

## FAQ — Section obligatoire

- Chaque article doit se terminer par une section **FAQ** (avant ou après le CTA final).
- **4 à 6 questions** maximum.
- Les questions doivent correspondre à des **requêtes réelles** que les utilisateurs tapent sur Google ("People Also Ask").
- Les réponses doivent être **concises** (3-5 lignes max par réponse).
- Les réponses ne doivent contenir **aucune information inventée** (même règle que le reste).

### Format

```markdown
## FAQ – [Thématique principale + localisation]

### [Question formulée naturellement ?]

[Réponse concise, factuelle, avec mot-clé si naturel.]
```

---

## Séparateurs et mise en forme

- Utiliser `---` entre chaque grande section H2 pour aérer la lecture.
- Utiliser le **gras** pour les arguments clés, chiffres importants, et mots à impact.
- Utiliser l'*italique* pour les nuances, les noms propres cités, et les termes à souligner.
- Utiliser les `>` blockquotes pour les phrases d'accroche ou les citations **réelles uniquement**.
- Utiliser les listes à puces pour les énumérations de 3+ éléments.

### Tirets longs / em dash — INTERDIT

- **Ne jamais utiliser** le tiret long `—` (em dash) ni le tiret moyen `–` (en dash) dans le contenu.
- Ces caractères se rendent mal dans certains navigateurs et éditeurs, et alourdissent la lecture.
- Remplacer systématiquement par une **virgule**, un **point**, ou une reformulation.
- Exemples :
  - MAUVAIS : `premier port de voyageurs de France — une opportunité unique`
  - BON : `premier port de voyageurs de France. Une opportunité unique`
  - BON : `premier port de voyageurs de France, une opportunité unique`

---

## Checklist avant livraison

- [ ] URL du domaine principal du client analysée
- [ ] Aucune information inventée dans l'article
- [ ] H1 optimisé longue traîne (titre du blog)
- [ ] Meta Title rédigé (max 60 caractères)
- [ ] Meta Description rédigée (max 155 caractères)
- [ ] Article entre 2000 et 2250 mots
- [ ] Mots-clés intégrés naturellement (H2, H3, intro, FAQ)
- [ ] 3 CTA placés (haut, milieu, bas) pointant vers le domaine principal
- [ ] Max 3 images avec alt text optimisé
- [ ] FAQ de 4 à 6 questions en fin d'article
- [ ] Ton professionnel et orienté conversion
- [ ] Séparateurs `---` entre les sections
- [ ] Données externes sourcées et vérifiables
