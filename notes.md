setState dans les fonctions asynchrones (exemple form Stripe, form airbnb)

**Nom de l'exercice**
Correction de la forme Stripe, login Airbnb, etc

**Description du problème**
Hello. Qq chose n'est pas très clair pour moi. J'aimerais bien soulever la question.
En fait, dans ma tête, les fonctions "event handler" groupent les setState et mettent à jour les states en groupe à la fin de la fonction. Dans la form Stripe, ça me perturbait qu'on setState un state "en cours" pour désactiver le boutton avant de lancer un await juste derrière, et donc alors que la fonction est en attente de la résolution de la promesse ; je me demandais comment ça se faisait que le state était mis à jour... Pourtant on ne peut efffectivement pas cliquer et le bouton est bien disabled alors que la promesse est pending... J'ai fait des essais en mettant des log dans le handler avant et après une opération asynchrone, et des log dans le composant et dans un useEffect pour suivre l'état du bouton via une ref, mais j'aimerais bien vérifier...

Ce que je comprends c'est que dès que la fonction reçoit la promesse (en pending), le composant met à jour le state, se rerender (cf log le composant dit...) et le bouton devient disabled (cf log useEffect dit). Mais:

- je suis surpris que ça se déclenche avant le reste du code et la fin de handleSubmit
- et la suite du code s'exécute effectivement bien 3/5 secondes plus tard... (et dit que le state est false, mais ça, ça me va dans la mesure où c'est bien le state reçu au moment du click).

Mon hypothèse c'est qu'en recontrant un await, React s'occupe des setState dont il a connaissance. Et donc que le composant fait des rerenders intermédiaires... J'ai rajouté l'opération inverse dans la même fonction et ça a l'air d'être ça... 2 mises à jour de state, 2 re-rerender... Mais d'un autre côté il y a pas mal de sujets sur StackO ou ailleurs qui remontent des difficultés à gérer les setState en asynchrone et donne des explications bizarres, et je n'ai pas trouvé de confirmation...

J'ai fait un repo avec les qlq lignes du test, c'est très court, mais assez illustratif du problème que j'évoque, je crois.

**Lien vers le repository du projet**
<https://github.com/c-marc/async-setstate>
