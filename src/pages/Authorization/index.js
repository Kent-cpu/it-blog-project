import React from 'react';

export const Authorization = () => {
    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="email">Электронная почта</label>
                    <input name="email" type="text"/>
                </div>

                <div>
                    <label htmlFor="password"></label>
                    <input name="password" type="text"/>
                </div>

                <button>Войти</button>
            </form>
        </div>
    );
};
