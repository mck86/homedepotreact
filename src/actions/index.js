import axios from 'axios';

export const FETCH_FIXER = 'FETCH_FIXER';

const ROOT_URL = "http://api.fixer.io/latest?"

export function fetchFixer(base) {
    base = base || 'CAD';

    const url = `${ROOT_URL}base=${base}&symbols=CAD,USD,EUR`
    const request = axios.get(url);

    return {
        type: FETCH_FIXER,
        payload: request
    };
}
