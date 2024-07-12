import React, { useState } from 'react';

const CustomButton = ({ onClick, children, ...props }) => {
    
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClick = async (event) => {
        setIsProcessing(true);
        try {
            await onClick(event);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <button onClick={handleClick} disabled={isProcessing} {...props}>
            {isProcessing ? 'Processing...' : children}
        </button>
    );
};

export default CustomButton;
