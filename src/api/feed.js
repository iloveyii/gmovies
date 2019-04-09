 import axios from 'axios';
 const server = 'http://imageloader-be.softhem.se/pics.php';
 const api_key = 'api_key=14c79282f80db76f1bf67452290e9d83';
 const search = 'https://api.themoviedb.org/3/search/movie?';

 export default {
    feed: {
        pics: () =>
            axios.get(server).then(res => {
                console.log(res.data.split('<URL kommentar>'));
                const dataArray = res.data.split('<URL kommentar>');
                if(dataArray.length > 1) {
                    return dataArray[1].trim();
                } else {
                    return 'NA';
                }
            }).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        search: (q) =>
            axios.get(search + 'query=' + q + '&' + api_key ).then(res => {
                return res.data;
            }).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
    }
}
