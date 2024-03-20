import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState([]);
    const [AllProducts, setAllProducts] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [fabricsdata, setFabricsData] = useState([]);
    const [AllcartData, setAllCartData] = useState([]);
    const [order, setOrder] = useState([]);
    const [CODorder, setCODorder] = useState([]);
    const [orderContactInfo, setorderContactInfo] = useState([]);
    const [localCartData, setLocalCartData] = useState([]);
    const [contactInfo, setContactInfo] = useState(null);
    const [favouriteData, setFavouriteData] = useState([])
    const [totals, setTotals] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [totalShipping, settotalShipping] = useState('');
    const [subtotalTaxandShipping, setsubtotalTaxandShipping] = useState('');
    const [there, setTheme] = useState('light');
    const [selectedCurrencyValue, setSelectedCurrencyValue] = useState(() => {
        const storedCurrency = localStorage.getItem('selectedCurrency');
        return storedCurrency || 'BDT';
    });
    const [selectedColor, setSelectedColor] = useState('');
    const [shippingData, setshippingData] = useState([]);
    // console.log(localCartData);

    const doller = 0.0091;

    // const [doller, setdoller] = useState(null);

    // useEffect(() => {
    //     const apiKey = '3a4af9e02140b22b89ebead94195ccc3'; // Replace with your actual API key
    //     const apiUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=USD&base=EUR`;

    //     axios.get(apiUrl)
    //         .then(response => {
    //             const usdRate = response.data.rates.USD;
    //             setdoller(usdRate);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching exchange rates:', error);
    //         });
    // }, []);


    // console.log(doller );

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggeduser => {
            console.log('log inned')
            setUser(loggeduser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const googleSignIN = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (FirstName, LastName) => {
        const displayName = `${FirstName} ${LastName}`;

        return updateProfile(auth.currentUser, {
            displayName: displayName
        });
    };
    // users
    useEffect(() => {
        fetch('https://taharz.onrender.com/users')
            .then(res => res.json())
            .then(data => setLoggedUser(data))
    }, [])

    // product
    useEffect(() => {
        fetch('https://taharz.onrender.com/product')
            .then(res => res.json())
            .then(data => setAllProducts(data))
    }, [])
    // category Names
    useEffect(() => {
        fetch('https://taharz.onrender.com/categoryInfo')
            .then(res => res.json())
            .then(data => setCategoryName(data))
    }, [])
    // fabrics Names
    useEffect(() => {
        fetch('https://taharz.onrender.com/fabrics')
            .then(res => res.json())
            .then(data => setFabricsData(data))
    }, [])
    // orders Names
    useEffect(() => {
        fetch('https://taharz.onrender.com/orders')
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])
    // fabrics Names
    useEffect(() => {
        fetch('https://taharz.onrender.com/CODorder')
            .then(res => res.json())
            .then(data => setCODorder(data))
    }, [])



    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updateUser,
        googleSignIN,
        loggedUser,
        setLoggedUser,
        AllProducts,
        categoryName,
        fabricsdata,
        AllcartData,
        setAllCartData,
        orderContactInfo, setorderContactInfo,
        localCartData, setLocalCartData,
        favouriteData, setFavouriteData,
        totals, setTotals,
        totalShipping, settotalShipping,
        subtotalTaxandShipping, setsubtotalTaxandShipping,
        selectedCurrencyValue, setSelectedCurrencyValue,
        doller, discount, setdiscount,
        order, setOrder, CODorder, setCODorder,
        selectedColor, setSelectedColor,
        contactInfo, setContactInfo,
        shippingData, setshippingData,
        there, setTheme
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;