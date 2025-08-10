import React, { SetStateAction, useEffect, useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import { X } from "lucide-react";


interface ExchangeRateResponse {
    result: string;
    base_code: string;
    conversion_rates: Record<string, number>;
}


interface CurrencyConverterProps{
        setHidePrices: React.Dispatch<SetStateAction<boolean>>
}


export default function CurrencyConverter({setHidePrices}: CurrencyConverterProps) {
    const [amount, setAmount] = useState<number>(1)
    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>("NGN")
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
    const [currencies, setCurrencies] = useState<string[]>([])
    const API_KEY = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
    const [showConversionModal, setshowConversionModal] = useState(false)




    useEffect(() => {

        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
            .then((res) => res.json())
            .then((data: ExchangeRateResponse) => {
                if (data.conversion_rates) {
                    setCurrencies(Object.keys(data.conversion_rates))
                }
            })
            .catch((err) => console.error("Error fetching currencies:", err))
    }, [API_KEY])


    const convertCurrency = () => {
        if (fromCurrency === toCurrency) {
            setConvertedAmount(amount)
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
            .then((res) => res.json())
            .then((data: ExchangeRateResponse) => {
                if (data.conversion_rates && data.conversion_rates[toCurrency]) {
                    const rate = data.conversion_rates[toCurrency]
                    setConvertedAmount(amount * rate)
                }
            })
            .catch((err) => console.error("Error converting currency:", err))
        setConvertedAmount(1)
    }



    {
        if (!showConversionModal)
            return (<button
                onClick={() => {
                    setshowConversionModal(true)
                    setHidePrices(true)
                }}
                className=" bg-[#EF8F57] text-white p-2 rounded-md w-fit ml-auto cursor-pointer flex items-center justify-center " >Convert currency</button>)



        else
            return (
                <div className="mx-auto w-[300px] h-fit py-6 px-5 rounded-xl flex flex-col items-center gap-5 bg-[#ffffff] text-black shadow-2xl " >

                    <button onClick={() => setshowConversionModal(false)} className="text-red-600 ml-auto cursor-pointer " ><X size={20} /></button>

                    <h1 className="text-[#EF8F57] font-semibold font-merriweather text-xl " >Currency Converter</h1>

                    <Input
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        type="number"
                        className="  mx-auto flex items-center justify-center p-1 w-fit border-2 border-black   "
                    />


                    <div className=" w-full flex items-center justify-between gap-5 " >



                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                        </select>


                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}  > {currency} </option>
                            ))}
                        </select>
                    </div>








                    <Button
                        ariaLabel="Convert"
                        label="Convert"
                        type="button"
                        variant="primary"
                        onClick={convertCurrency}
                        className=" !bg-[#EF8F57] w-full " />



                    {convertedAmount !== null && (
                        <h3>
                            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                        </h3>
                    )}

                </div>
            )
    }
}