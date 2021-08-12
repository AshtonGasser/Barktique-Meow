import React from 'react';
import './EmployeeHeader.css';

// function for Employee Header
function EmployeeHeader() {
    return (
        <header className="employee-header">
            <div className="employee-logo">
                <img 
                    className="barktique_logo"
                    src="./images/Barktique-and-meow-logo-final-color.png" 
                />
            </div>
        </header>
    )
} // end EmployeeHeader

// export EmployeeHeader
export default EmployeeHeader;