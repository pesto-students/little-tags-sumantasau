import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};


//console.log(`API Key: ${config.apiKey}`)


class Firebase {
    db : any;
    auth : any;
    googleAuthProvider : any
    facebookAuthProvider : any

    constructor() {
        app.initializeApp(config);
        this.db = app.database();
        this.auth = app.auth();
    
        this.googleAuthProvider = new app.auth.GoogleAuthProvider();

        this.facebookAuthProvider = new app.auth.FacebookAuthProvider();
      }
  
    doGoogleSignIn = () => this.auth.signInWithPopup(this.googleAuthProvider);

    doFacebookSignIn = () => this.auth.signInWithPopup(this.facebookAuthProvider);
  
    user = (uid:string) => this.db.ref(`/users/${uid}`);
  
    /*doSignOut = () => this.auth.signOut();
  
    onAuthChangeListener = (next:any, fallback = () => {}) => {
      return this.auth.onAuthStateChanged((authUser:any) => {
        if (authUser) {
          this.user(authUser.uid)
            .once('value')
            .then((snapshot:any) => {
              const dbUser = snapshot.val();
              const user = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                ...dbUser,
              };
               console.log(`authUser:: listener:: ${user}`);
              next(user);
            });
        } else {
           console.log(`Now user is not available`);
          fallback();
        }
      });
    };*/
  }
  
  export default Firebase;