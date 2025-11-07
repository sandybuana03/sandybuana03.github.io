const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Plugins.TiledBg,
		C3.Behaviors.solid,
		C3.Behaviors.Platform,
		C3.Behaviors.scrollto,
		C3.Plugins.Keyboard,
		C3.Behaviors.Platform.Cnds.IsMoving,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Behaviors.Platform.Cnds.IsJumping,
		C3.Behaviors.Platform.Cnds.IsFalling,
		C3.Plugins.Keyboard.Cnds.OnKey,
		C3.Plugins.Sprite.Acts.SetMirrored,
		C3.Plugins.Sprite.Cnds.IsBoolInstanceVarSet,
		C3.Plugins.Sprite.Cnds.CompareInstanceVar,
		C3.Behaviors.Platform.Acts.SimulateControl,
		C3.Behaviors.Platform.Cnds.IsByWall,
		C3.Plugins.Sprite.Acts.SetInstanceVar,
		C3.Plugins.Sprite.Cnds.IsOutsideLayout,
		C3.Plugins.System.Acts.RestartLayout,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Plugins.Sprite.Acts.Destroy,
		C3.Plugins.Sprite.Acts.SetBoolInstanceVar,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.Sprite.Acts.SetPos,
		C3.Plugins.System.Exps.scrollx,
		C3.Plugins.System.Exps.scrolly
	];
};
self.C3_JsPropNameTable = [
	{background: 0},
	{Solid: 0},
	{TiledBackground: 0},
	{Platform: 0},
	{ScrollTo: 0},
	{hero: 0},
	{Keyboard: 0},
	{move: 0},
	{aktif: 0},
	{musuh: 0},
	{Sprite2: 0},
	{Sprite: 0},
	{bintang: 0},
	{menang: 0}
];

self.InstanceType = {
	background: class extends self.ISpriteInstance {},
	TiledBackground: class extends self.ITiledBackgroundInstance {},
	hero: class extends self.ISpriteInstance {},
	Keyboard: class extends self.IInstance {},
	musuh: class extends self.ISpriteInstance {},
	Sprite2: class extends self.ISpriteInstance {},
	Sprite: class extends self.ISpriteInstance {},
	bintang: class extends self.ISpriteInstance {},
	menang: class extends self.ISpriteInstance {}
}