import React, { useState, useEffect } from 'react';
import './styles.css';

const SwotAnalysis = ({ swot, isEditable, onSwotChange }) => {
    const [localSwot, setLocalSwot] = useState({
        forces: [],
        faiblesses: [],
        opportunites: [],
        menaces: [],
    });

    // ✅ Synchroniser dès que `swot` arrive/est mis à jour
    useEffect(() => {
        if (swot) {
            setLocalSwot(swot);
        }
    }, [swot]);

    const handleAdd = (type) => {
        const value = prompt(`Add a new item to ${type}:`);
        if (value && value.trim() !== '') {
            const updatedList = [...localSwot[type], value.trim()];
            const updatedSwot = { ...localSwot, [type]: updatedList };
            setLocalSwot(updatedSwot);
            onSwotChange?.(updatedSwot);
        }
    };

    const handleRemove = (type, index) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        const updatedList = localSwot[type].filter((_, i) => i !== index);
        const updatedSwot = { ...localSwot, [type]: updatedList };
        setLocalSwot(updatedSwot);
        onSwotChange?.(updatedSwot);
    };

    const renderList = (title, type) => (
        <div className={`swot-box swot-box-${type}`}>
            <div className='d-flex justify-content-between align-items-center  mb-3'>
                <h3 style={{ margin: "0" }}>{title}</h3>
                {isEditable && (
                    <button className="btn" onClick={() => handleAdd(type)}>
                        +
                    </button>
                )}
            </div>
            <ul>
                {localSwot[type]?.map((item, index) => (
                    <li key={index}>
                        {item}
                        {isEditable && (
                            <button className="btn btn-sm btn-danger ms-2" onClick={() => handleRemove(type, index)}>
                                ✕
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="swot-container">
                    {renderList('S', 'forces')}
                    {renderList('W', 'faiblesses')}
                    {renderList('O', 'opportunites')}
                    {renderList('T', 'menaces')}
                </div>
            </div>
        </div>
    );
};

export default SwotAnalysis;
