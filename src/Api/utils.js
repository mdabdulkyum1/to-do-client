import axios from "axios";



const image_hosting_key = import.meta.env.VITE_IMGBB_API_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export const  imageUpload = async imageData => {
    
    const formData = new FormData();
    formData.append('image', imageData)

    const { data } = await axios.post( image_hosting_api , formData);

    return data.data.display_url;

}


export const saveUser = async (user) => {
    const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
    }
    const {data} = await axios.post(`${import.meta.env.VITE_server_url}/users`, userInfo);
    return data;
}