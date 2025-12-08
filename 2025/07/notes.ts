/**
 * PART 1
 *
 * implement DFS
 *
 * parse input
 * split at \n
 * remove all empty lines
 *
 * we create an array of splitters
 *
 * we need to have a function that traverses down it takes a starting cord
 * for every step down we check if we hit a cord of splitters
 * if we hit a cord of splitters we push the posistion of left and right to a queue
 * we work through that queue
 */

/**
 * PART 2
 *
 * we have a more complex computation here
 * we dont split now but the line can go in both directions
 * each crossing should be an object with cord, left, right
 * if we hit a crossing we create a new timeline
 * each crossing after also creates a timeline
 * we have to playthrough each timeline and add up our result once we are done
 *
 * playthrough
 *
 * we hit 2 7 new queue 2 timelines
 * from 2 7 we go left
 * we hit 4 6 new queue 2 new timelines
 * from 2 7 we go right
 * we hit 4 8 new queue 2 new timelines
 *
 * from 4 6 we go left
 * we hit 6 5 new queue 2 new timelines
 * from 4 6 we go right
 * we hit 6 7 new queue 2 new timelines
 *
 * close queue 2
 *
 * from 4 8 we go left
 * we hit 6 7 new queue 2 new timelines
 * from 4 8 we go right
 * we hit 6 9 new queue 2 new timelines
 *
 * close queue 3
 *
 * we have 4 queues open now starting at 6,5 6,7, 6,7 6,9
 *
 * if this would be the last line and we dont hit any more crossings
 * we have 7 timelines going
 *
 * another approach
 *
 * we start and have one timeline this timeline has a multiplier of 1
 * when we hit 2 7 the timeline splits into 2 each with a multiplier of 2
 * we hit 4 6 the timeline splits into 2 more each with a multiplier of 4
 * we hit 4 8 the timeline splits into 2 more each with a multiplier of 4
 *
 * this means when we hit 4 6 and 4 8 we have
 *
 *
 * another approach
 *
 * we fill the grid with 0 where we have .
 * we go down bfs
 * we add 1 for every timeline
 *
 */