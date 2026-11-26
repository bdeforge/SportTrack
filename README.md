# SportTrack

Mini-app de suivi des séances de salle, installable sur Android et utilisable hors ligne.

## Fichiers

- `seances.md` : le plan des séances. **C'est le seul fichier à modifier pour changer une séance.**
- `index.html` : l'app (séance du jour, progression, sauvegarde).
- `sw.js`, `manifest.webmanifest`, `icon-*.png` : mode hors ligne et installation sur l'écran d'accueil.

## Format de `seances.md`

```
# Séance A | Lundi | Sous-titre | Durée
> Note affichée en haut de la séance
## Nom du groupe
- [id] Nom de l'exercice | 3 x 10 | 1'30 | Consigne | charge indicative
```

- `[id]` relie l'exercice à son historique de charges : on peut renommer l'exercice, mais il ne faut pas changer l'id.
- Repos : `1'30`, `1'`, `45"`, ou `-` pour un exercice sans charge ni repos (échauffement).
- La charge indicative (dernière colonne) est facultative.

## Données

Les charges et séries cochées sont stockées dans le navigateur du téléphone, jamais dans ce dépôt.
L'onglet Sauvegarde permet de les exporter (JSON ou CSV) et de les restaurer.
