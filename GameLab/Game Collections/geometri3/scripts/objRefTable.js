const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.TiledBg,
		C3.Behaviors.solid,
		C3.Plugins.Sprite,
		C3.Behaviors.Platform,
		C3.Behaviors.scrollto,
		C3.Behaviors.Tween,
		C3.Plugins.Touch,
		C3.Plugins.Particles,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Behaviors.Platform.Acts.SimulateControl,
		C3.Plugins.Touch.Cnds.OnTouchStart,
		C3.Behaviors.Platform.Cnds.OnJump,
		C3.Plugins.System.Cnds.Compare,
		C3.Plugins.Sprite.Exps.Angle,
		C3.Behaviors.Tween.Acts.TweenOneProperty,
		C3.Plugins.Sprite.Acts.SetAngle,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Plugins.Sprite.Acts.Destroy,
		C3.Plugins.System.Acts.CreateObject,
		C3.Plugins.Sprite.Exps.X,
		C3.Plugins.Sprite.Exps.Y,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.System.Acts.RestartLayout,
		C3.Plugins.Sprite.Acts.SetPos
	];
};
self.C3_JsPropNameTable = [
	{TiledBackground: 0},
	{TiledBackground2: 0},
	{Solid: 0},
	{tanah: 0},
	{finish: 0},
	{Platform: 0},
	{ScrollTo: 0},
	{Tween: 0},
	{player: 0},
	{Touch: 0},
	{musuh: 0},
	{Particles: 0},
	{musuh2: 0},
	{Sprite: 0}
];

self.InstanceType = {
	TiledBackground: class extends self.ITiledBackgroundInstance {},
	TiledBackground2: class extends self.ITiledBackgroundInstance {},
	tanah: class extends self.ITiledBackgroundInstance {},
	finish: class extends self.ITiledBackgroundInstance {},
	player: class extends self.ISpriteInstance {},
	Touch: class extends self.IInstance {},
	musuh: class extends self.ISpriteInstance {},
	Particles: class extends self.IParticlesInstance {},
	musuh2: class extends self.IParticlesInstance {},
	Sprite: class extends self.ISpriteInstance {}
}