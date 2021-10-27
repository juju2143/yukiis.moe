window.onload = function(){
Physics(function(world){
var renderer = Physics.renderer('canvas', {
    el: 'viewport', // id of the canvas element
    width: 600,
    height: 400,
    styles: {
        'convex-polygon' : {
            angleIndicator: false
        }
    }
});
world.add( renderer );

var sceptre = new Array();
sceptre[0] = Physics.body('convex-polygon', {
    x: 400,
    y: 200,
    vx: 0.01,
    vertices: [
        {x: 0, y: 250},
        {x: 61, y: 250},
        {x: 61, y: 0},
        {x: 0, y: 0}
    ]
});
sceptre[0].view = new Image();
sceptre[0].view.src = '/images/horselife98-036.png';
world.add( sceptre[0] );
world.add( Physics.behavior('constant-acceleration') );
var bounds = Physics.aabb(0, 0, 600, 400);
world.add( Physics.behavior('edge-collision-detection', {
    aabb: bounds
}) );
// ensure objects bounce when edge collision is detected
world.add( Physics.behavior('body-impulse-response') );
world.add( Physics.behavior('edge-collision-detection', {
    aabb: bounds,
    restitution: 0.1
}) );
world.add( Physics.behavior('body-collision-detection') );
world.add( Physics.behavior('sweep-prune') );

world.render();

// subscribe to ticker to advance the simulation
Physics.util.ticker.subscribe(function( time, dt ){
    world.step( time );
});

// start the ticker
Physics.util.ticker.start();

world.subscribe('step', function(){
    world.render();
});

document.querySelector("#viewport").onclick = function(e){
    world.add(sceptre[0]);
    world.render();
}
});
}