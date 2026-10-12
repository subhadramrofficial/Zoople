function describeScore(score:number):string{
    if(score>=90){
        return 'Excellent';
    }else if(score>=60){
        return 'Pass'
    }else{
        return 'Fail'
    }
}
console.log(describeScore(95));
console.log(describeScore(72));
console.log(describeScore(40));
