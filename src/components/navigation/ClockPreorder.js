import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

const ClockPreorder = ({ preorder, delete_preorder }) => {

    const [timeRemaining, setTimeRemaining] = useState('');

    const intervalRef = useRef(null);

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const expirationDate = new Date(preorder.date_expired);
            const currentTime = new Date();

            const timeDifference = expirationDate - currentTime;

            if (timeDifference <= 0) {
                clearInterval(intervalRef.current);
                setTimeRemaining('Pedido expirado');
                delete_preorder(); // Ejecuta la función delete_preorder cuando el tiempo llega a cero
            } else {
                const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutesRemaining = Math.floor((timeDifference / (1000 * 60)) % 60);
                const secondsRemaining = Math.floor((timeDifference / 1000) % 60);

                setTimeRemaining(`${hoursRemaining} horas, ${minutesRemaining} minutos y ${secondsRemaining} segundos`);
            }
        };

        calculateTimeRemaining();

        intervalRef.current = setInterval(calculateTimeRemaining, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [preorder.date_expired, delete_preorder]);

    return (
        <div className='bg-blue-900 py-3 mb-2 mx-auto text-center'>
            <h1 className='px-16 text-white'>
                Apreciado {preorder && preorder.full_name}, te quedan {timeRemaining} para cancelar tu pedido.
            </h1>
            <Link to="/payorder" className='px-16 font-semibold text-lg text-white'>
                {'>>> '} <span className='underline animate-pulse'>Paga tu orden aquí</span> {' <<<'}
            </Link>
        </div>
    )
}



export default ClockPreorder