function fibo(num)
{
    if(num===1)
    {
        return 0;
    }
    if(num===2)
    {
        return 1;
    }
   let current = 1;
   let prev = 0;
   let res = 0;
    for(i=2;i<=num;i++)
    {
       res = prev+current;
       prev = current;
       current = res;
    }
   return res;
}

console.log(fibo(7));