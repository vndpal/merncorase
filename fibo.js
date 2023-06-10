function fibo(num)
{
    if(num===0)
    {
        return 0;
    }
   let current = 0;
   let prev = 0;
    for(i=0;i<=num;i++)
    {
       
       prev = current;
       current = current + prev;
       if(current===0)
       {
           current++;
       }
    }
   return current;
}

console.log(fibo(2));