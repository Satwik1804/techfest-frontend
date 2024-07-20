import React, { useState, useContext, useEffect, useRef } from 'react';

import Context from "../context/context.js";

const Stores = () => {
    const context = useContext(Context);
    const { stores, fetchAllItems, addStore } = context;
    const [store, setStore] = useState({ storeId: "", storeImage: "", storePrice: "" });
    const [setBuyItem] = useState(null);
    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        addStore(store.storeId, store.storeImage, store.storePrice);
    }

    const handleBuy = (item) => {
        ref.current.click();
        setBuyItem(item);
    }

    const handleChange = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchAllItems();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", store);
        refClose.current.click();
    }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="storeId" className="form-label">Store Id</label>
                                    <input type="text" className="form-control" id="storeId" name="storeId" onChange={handleChange} />
                                    <img height="100" width="100" src="https://www.investopedia.com/thmb/tJq-mQKa7VHC4JG76FATefpzN1Y=/1148x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"></img>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {stores.map(store => (
                <div key={store._id}>
                    <img src={store.storeImage} style={{ width: '100%', height: '440px', width: '450px', maxWidth: '1200px', maxHeight: '500px', marginRight: '10px' }} />
                    <h2>{store.storePrice}</h2>
                    <button className="btn btn-success" style={{marginLeft:"10%"}} onClick={() => handleBuy(store)}>Buy</button>
                </div>
            ))}
        </div>
    )
}

export default Stores;