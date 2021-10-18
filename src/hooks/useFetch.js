import React, {useEffect} from 'react';

export const useFetch = (url, option) => {
    const [response, setResponse] = React.useState(null);

    useEffect(async () => {
        const res = await fetch(url);
        const json = await res.json();

        setResponse(json);
    });

    return response;
};

