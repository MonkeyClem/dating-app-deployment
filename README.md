DATING-APP-DEPLOYMENT : 
- La partie client de cette application a été entièrement réalisée grâce a React.JS / CSS.
- Les requêtes sont gérées via la combinaison d'Axios / Node.JS / Express.JS 
- Base de données NoSQL (MongoDB)
- IMPORTANT : Pour le moment, l'URL de l'image à renseigner lors de l'inscription doit être au format IMGUR 
              (exemple : https://imgur.com/Q9WPlWA.jpg) 

MODIFS A VENIR :
- Amélioration de l'interface utilisateur 
- Intégration de la norme MIME_types pour l'image à renseigner lors de l'inscription, afin de permettre aux utilisateurs de renseigner
  leur photo de profil au format JPG / JPEG ou autres 
- Optimisation du code JS ( useEffect / useState à revoir + réorganisation de l'arborescence fichiers  )
- Ajout d'un tabeau "Likes" dans le model MongoDB. 
  Dans ce tableau seront ajoutés les utilisateurs ayant été 
  swipés à droite. Cela permettra de mettre en place une réelle fonction de match 
