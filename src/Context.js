import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    
    const contextProps = {
        allPhotos,
        toggleFavorite,
        cartItems,
        addToCart,
        removeFromCart,
        emptyCart
    }
    
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    // On mount, pull photos from source
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, [])
    
    function toggleFavorite(id) {
        const updatedPhotos = allPhotos.map(photo => {
            if(photo.id === id)
                return {...photo, isFavorite: !photo.isFavorite}
            return photo
        })
        setAllPhotos(updatedPhotos)
    }
    
    function addToCart(newItem) {
        setCartItems(prevItems => [...prevItems, newItem])
    }
    
    function removeFromCart(id) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }
    
    function emptyCart() {
        setCartItems([])
    }
    
    return (
        <Context.Provider value={contextProps}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}