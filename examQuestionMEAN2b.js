/**
 * Created by Dino on 1/6/2017.
 */
// Question 1 - Why would you consider a Scripting Language as JavaScript as your Backend Platform. --------------------

/*
 Nogle af de gode ting ved at bruge Javascript som backend language er:

 * Man kan bruge callbacks med simpel syntaks.
 */


// function _deleteCoffeeBrand(CoffeeBrandID, callback) {  // den tager 2 input parametre, brandId og callback.
//         if (CoffeeBrandID) {
//             CoffeeBrand.deleteCoffeeBrand(CoffeeBrandID, function (data2) {  //her sletter vi et brand og den funktion
//                 //som gør det har en callback i sig, som den sender tilbage til denne funktion som "data2".
//                 callback(data2) // Den kan vi så sende tilbage til den funktion som har kaldt _deleteCoffeeBrand.
//             })
//         } else callback(false) // eller bare sende false tilbage.
// }

/*

 * Der findes packagemanager som NPM, det gør at man let kan tilføje og manage sine dependencies i et projekt.

 * JS på frontend, JS på backend, når man arbejder med AJAX, JSON og REST API's gør det kommunikationen
 * super let.

 */





/*
// Question 2 ----------------------------------------------------------------------------------------------------------
Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to
implement a Node.js based server architecture that still could take advantage of a multi-core Server)

Det bedste bud her er cluster. Brugen deraf kan ses i clustersQuestion2.js.
    Hvor der startes en master thread, samt en worker per CPU kerne.

*/






// Question 3 - Explain, using relevant examples, the Express concept; middleware. -------------------------------------

/*
 Middleware funktioner er funktioner som har adgang til både req og res objecterne, samt "next" middleware funktionen.
 Middleware kan eksekvere kode, lave ændringer på req og res objecterne, slutte req-res cycklus og kalde "next"


 I vores app bruger vi det således:

 Vores middleware består i at tjekker på tokens på requests. Bliver requestet ikke denied så bliver der kaldt next som
 sender brugeren videre i sit request.
 */

// app.all('/api/*', function (req, res, next) {
//     var secretKey;
//     // Her henter vi først secretKey
//     var getSecret = Secret.getSecretKey(function (data) {
//         secretKey = data;
//         //Hvis vi finder secretKey går vi videre.
//         if (getSecret !== null) {
//             // check header  for Token
//             console.log("her er req: " + req)
//             console.log("checking if there is a accessToken.")
//             var accessToken = req.get('accessToken'); //det er navnet vi skal give accessToken i request fra client.
//             console.log("her er accessToken: " + accessToken)
//             // decode Token
//             if (accessToken !== null) {
//                 console.log("Verifying said accessToken.")
//                 // verifies Token
//                 jwt.verify(accessToken, secretKey, function (err, decoded) {
//                     if (err) {
//                         console.log("accessToken blev ikke verified.")
//                         var refreshToken = req.get('refreshToken');
//                         //hvis vi finder en refreshToken
//                         if (refreshToken !== null) {
//                             console.log("verifying refreshToken: " + refreshToken);
//
//                             User.getUserByRefreshToken(refreshToken, function (user) {
//                                 //her skal vi tjekke på refreshToken før vi går videre nedenunder.
//                                 if (user === false) {
//                                     console.log("kunne ikke verify refreshToken")
//                                     //det virkede ikke vi sender user til Login.
//                                     res.status(401).send(false);
//                                 } else {
//                                     console.log("refreshToken blev verified, laver ny accessToken");
//                                     //Hvis vi får lavet en ny accessToken sender vi user til home med en accessToken. Den skal client gemme i sharedPreferences og lave en ny cookie med den i.
//                                     //lav ny accessToken
//                                     Token.getToken(user, function (data) {
//                                         console.log("hvad er user? " + user)
//                                         console.log("Success vi har fået en ny accessToken: " + data)
//                                         var newAccessToken = data;
//                                         req.headers.accessToken = newAccessToken;
//                                         jwt.verify(newAccessToken, secretKey, function (err, decoded) {
//                                             console.log("this is decoded from authenticate in app.ja: " + JSON.stringify(decoded) + " her er info vi skal have " + decoded.data.roleId)
//                                             req.decoded = decoded;
//                                             next();
//                                         })
//                                     });
//                                 }
//                             });
//                         }
//                     } else {
//                         // if everything is good, save to request for use in other routes
//                         req.headers.accessToken = accessToken;
//                         req.decoded = decoded;
//                         console.log("accessToken blev verified")
//                         next();
//                         // res.redirect(307, "/home"); //redirect til appens "home" side - Kan ikke finde ud af hvordan jeg sender decoded med. Skal jeg lave en cookie?
//                     }
//                 });
//             } else {
//                 console.log("No Token found will start redirecting...")
//                 // if there is no Token
//                 //redirect user to login page.
//                 res.status(401).send("Send bruger til login side.");
//             }
//         }
//     })
// });

/*
 Question 4 ---- Explain, using relevant examples, how to implement sessions, and the legal implications of doing this.)

Først jura: Hvis man bruger session cookies (hvilket alle gør), skal man i EU gøre brugeren opmærksom derpå.

    I app.js er der et eksempel på session cookies med express-session npm pakken.
    */


/*
 Question 5 ---Compare the express strategy toward (server side) templating with the one you used with Java on second
 semester.)

 Jade er rimelig meget det samme som Java expression language, dog har Jade ikke nogen closing tags.

    */

// Question 6 --- Explain, using relevant examples, about testing JavaScript code, relevant packages
// (Mocha etc.) and how to test asynchronous code.
// se spørgsmål 3 fra ExamQuestionsMEAN2b for svar.