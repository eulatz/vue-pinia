// --- Imports --- //
import { defineStore } from "pinia";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile, 
} from "firebase/auth";
import { auth,db, storage } from "../../firebaseConfig";
import router  from "../router/router.js";
import { useDatabaseStore } from "./database.js";
import { addDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore/lite";
import { ref , uploadBytes, getDownloadURL} from "firebase/storage";

// --- Store Definition --- //
export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    getters: {},
    actions: {
        // --- Set User Data --- //
        async setUser (user) {
            try {
            const docRef = doc(db , "users", user.uid );               

            this.userData = {
                email:user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            }
await setDoc(docRef, this.userData)
            
            } catch (error) {
                console.log(error)
            }
        },

async updateUser (displayName, imagen) {
    this.loadingUser = true

    try {
        if (!imagen || !imagen.originFileObj) {
            console.log("No hay archivo para subir")
            return
        } else {

            
        const storageRef = ref(storage, `perfiles/${this.userData.uid}/perfil.png`)
                await uploadBytes(storageRef, imagen.originFileObj)
            
            const photoURL = await getDownloadURL(storageRef)
                await updateProfile(auth.currentUser, {displayName,photoURL})
            
            this.setUser(auth.currentUser)
        }
        
        } catch (error) {
            console.error("🔥 Error al subir imagen:", error)
            message.error("Error: " + error.code)
                return error.code
}
finally {
                this.loadingUser = false

}

        },
        // --- Register User --- //
        async registerUser(email,password) {
            this.loadingUser = true
            try {
                const {user} = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                this.userData ={email: user.email, uid: user.uid}
                router.push('/')
                console.log(user)
            }
            catch(error) {
                console.log(error.code)
                return error.code

            }
            finally {
                this.loadingUser = false
            }
        },
    
        // --- Login User --- //
        async loginUser(email,password) {
            this.loadingUser = true
            try {
                const {user} = await signInWithEmailAndPassword(
                    auth, 
                    email, 
                    password
                )
                await this.setUser(user)
                router.push('/')

            } catch (error) {
                console.log(error.code)
                return error.code
            }
            finally {
            this.loadingUser = false
            }
            
        },

        // --- Logout User --- //
        async logOutUser() {
            const databaseStore = useDatabaseStore()
            databaseStore.$reset()
            try {
                router.push('/login')
                await signOut(auth)                
            }
            catch(error){
                console.log(error)
            }
            finally {
                this.loadingUser = false
            }
        },

        // --- Current User Session --- //
        async currentUser() {
            return new Promise ((resolve, reject) => {
            const unsuscribe = onAuthStateChanged(
                auth, 
                async(user) => {
                if (user) {
                    console.log(user)
                    this.userData = {
                        email:user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
            }
    //await this.setUser(user)
                } else {
                    this.userData = null 
                    const databaseStore = useDatabaseStore()
                    databaseStore.$reset()
                }
                resolve(user)
            
            },
            (e) => reject(e)
            )
        })
        }
    },
    })
    

