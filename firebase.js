import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { ToastAndroid } from 'react-native'; // Using ToastAndroid for notifications in React Native

const firebaseConfig = {
    apiKey: "AIzaSyB3EZqxM73d1aN7ddSnyVKRpV-umswoBGA",
    authDomain: "fyp-srs.firebaseapp.com",
    projectId: "fyp-srs",
    storageBucket: "fyp-srs.appspot.com",
    messagingSenderId: "99698953760",
    appId: "1:99698953760:android:ac0ffc41cfbc4ac7a97645",
    measurementId: "G-measurement-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestoredb = getFirestore(app);

export { auth, storage, firestoredb };

export const registerWithEmailAndPassword = async (email, password, confirmPassword, firstName, lastName, role, path) => {
    try {
        if (password !== confirmPassword) {
            ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
            return false;
        }

        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        const user = userInfo.user;

        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
        });

        await setDoc(doc(firestoredb, "Users", user.uid), {
            uid: user.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role,
        });

        await sendEmailVerification(user, {
            url: `http://localhost:3000/${path}`,
        }).then(() => {
            ToastAndroid.show("Verification email sent", ToastAndroid.SHORT);
            console.log("Verification email sent");
        });

        await signOut(auth);
        return true;
    } catch (error) {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
            ToastAndroid.show("This email is already registered", ToastAndroid.SHORT);
        }
        return false;
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    console.log(email, "this is my email ---------------------------");
    try {
        const userDataArray = [];

        const usersCollectionRef = collection(firestoredb, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            userDataArray.push(userData);
        });



        const isUserRegistered = userDataArray.some(user => user.email === email);

        if (!isUserRegistered) {
            ToastAndroid.show("User is not registered. Please register before logging in.", ToastAndroid.SHORT);
            return false;
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(email, "===================");

        if (!user.emailVerified) {
            ToastAndroid.show("Email is not verified. Please verify your email before logging in.", ToastAndroid.SHORT);
            return false;
        }

        const userDoc = usersSnapshot.docs.find(doc => doc.data().email === email);
        const userData = userDoc.data();


        return {
            uid: user.uid,
            email: user.email,
            role: userData.role
        };
    } catch (error) {
        console.error('Email/Password login failed:', error.message);
        if (error.code === 'auth/invalid-credential') {
            ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Login failed. Please try again.", ToastAndroid.SHORT);
        }
        return false;
    }
};


// Function to save user profile data to Firestore
export const editUserProfile = async (data) => {
    try {
        const userId = await getCurrentUser();
        const usersRef = collection(firestoredb, "Users");
        const userDocRef = doc(usersRef, userId.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // Merge the data into the existing document
            await setDoc(userDocRef, data, { merge: true });
        } else {
            // Create a new document with the provided data
            await setDoc(userDocRef, data);
        }

        // Update profile display name
        const { firstName, lastName } = data;
        const name = `${firstName} ${lastName}`;
        await updateProfile(auth.currentUser, { displayName: name });

        // If contact number is provided, update the Firestore document
        if (data.contactNumber) {
            // Assuming 'contactNumber' is the name of the field in Firestore
            await updateDoc(userDocRef, { contactNumber: data.contactNumber });
        }

    } catch (error) {
        console.error("Error saving user profile data:", error);
    }
};



export const getUserDataForCurrentUser = async () => {
    try {
        const userId = await getCurrentUser();
        return new Promise(async (resolve, reject) => {
            if (userId) {
                const userDataArray = [];
                const userDocRef = doc(firestoredb, 'Users', userId.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    userDataArray.push(userData);
                } else {
                    console.error('User document not found for UID ' + userId);
                }

                resolve(userDataArray.length > 0 ? userDataArray[0] : null);
            } else {
                resolve(null);
            }
        });
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw error;
    }
};


export const getAllUsers = async () => {
    try {
        const userDataArray = [];

        const usersCollectionRef = collection(firestoredb, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            userDataArray.push(userData);
        });

        return userDataArray;
    } catch (error) {
        console.error('Error retrieving users data:', error);
        throw error;
    }
};


export const uploadImg = async (image) => {
    try {
        const user = auth.currentUser;
        const userId = await getCurrentUser();
        const imageRef = ref(storage, `${userId.uid}-${Date.now()}-image`);
        const snapshot = await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        await updateProfile(user, {
            photoURL: imageUrl,
        });
        const userDocRef = doc(firestoredb, "Users", userId.uid);

        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            await updateDoc(userDocRef, {
                image: imageUrl,
            });

            return imageUrl;
        } else {
            console.error("User not found");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};