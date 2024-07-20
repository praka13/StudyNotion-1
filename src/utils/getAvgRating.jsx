export default function getAvgRating(ratingArray){
    if(ratingArray?.length===0){
        console.log(ratingArray);
        console.log(ratingArray?.length);
        console.log("Hello1");
        return 0
    }
    else{
        console.log(ratingArray);
        console.log(ratingArray?.length);
        console.log("Hello2");
        const getRating=ratingArray.reduce((acc,curr)=>{
            return acc+curr.rating
        },0)
    
        
    
        const avgRating=Math.round((getRating/ratingArray.length)*10)/10
    
        return avgRating
    
    }
}