/*

Every section is an ID
Each Elv has a range of IDs assigned
Many assignments overlap though
Elves pair up in twos 
The assignments range from a single section to multiple sections

Find out which pair as an assignment completely contained in the other ones.
Count these.

Thoughts:

each elv has 2 values, so 4 per pair

elv1 a b
elv2 c d

pair is only inside if 
c >= a, d <= b
a >= c, b <= d

True  
<-a------------b->
    <-c-----d->

True
    <-a-----b->
<-c------------d->

True
<-a------------b->
<-c------------d->


False
<-a--b-> 
        <-c--d->

False
        <-a--b->
<-c--d->

False
    <-a-----b->
<-c-----d->

False
<-a-----b->
    <-c-----d->
    
*/