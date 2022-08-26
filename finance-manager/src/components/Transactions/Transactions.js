import React, { useState, useEffect } from 'react'
import './Transactions.css'

const Transactions = () => {

    // Stores the transaction history as state
    const [bankData, setBankData] = useState([])

    // Fetches the transaction history from the backend
    useEffect(() => {
        fetch("http://127.0.0.1:5000/bankData").then(response => response.json()
            .then(
                data => {
                    setBankData(data)
                    console.log(data)
                }
            ))
    }, [])

    return (
        <>
            <h2>Transactions</h2>
            <div className='transactionsGrid'>

                {/* Column Titles */}
                <h4>Date</h4>
                <h4>Description</h4>
                <h4>Debit</h4>
                <h4>Credit</h4>
                <h4>Balance</h4>
                
                {/* Transaction History from Backend */}
                {(typeof bankData[1] === "undefined") ? (<h1>Loading...</h1>) : (
                    bankData.map((it, index) => (
                        <>
                            <p key={index}>{it[0]}</p>
                            <p key={index}>{it[1]}</p>
                            <p key={index}>{it[2]}</p>
                            <p key={index}>{it[3]}</p>
                            <p key={index}>{it[4]}</p>
                        </>
                    ))
                )
                }
            </div>
        </>
    )
}

export default Transactions