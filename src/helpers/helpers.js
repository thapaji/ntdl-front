export const randomChar =()=>{
    const str = 'qwertyuiopasdfghjklzxcvbnm';
    return str[Math.floor(Math.random()*str.length)];
}