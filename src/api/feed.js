 import axios from 'axios';
 const server = 'http://imageloader-be.softhem.se/pics.php';

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
    }
}
