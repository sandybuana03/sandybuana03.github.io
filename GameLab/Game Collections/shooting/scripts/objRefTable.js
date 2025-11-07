const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.Bullet,
		C3.Plugins.Mouse,
		C3.Plugins.Text,
		C3.Behaviors.Anchor,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Sprite.Acts.SetTowardPosition,
		C3.Plugins.Mouse.Exps.X,
		C3.Plugins.Mouse.Exps.Y,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Behaviors.Bullet.Acts.SetSpeed,
		C3.Behaviors.Bullet.Acts.SetGravity,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Plugins.System.Acts.AddVar,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.System.Cnds.Every,
		C3.Plugins.System.Exps.random,
		C3.Plugins.System.Acts.CreateObject,
		C3.Plugins.Mouse.Cnds.OnClick,
		C3.Plugins.Sprite.Acts.Spawn
	];
};
self.C3_JsPropNameTable = [
	{Sprite: 0},
	{Sprite2: 0},
	{Sprite3: 0},
	{Bullet: 0},
	{musuh: 0},
	{peluru: 0},
	{Mouse: 0},
	{txtScore: 0},
	{Anchor: 0},
	{musuh2: 0},
	{Score: 0}
];

self.InstanceType = {
	Sprite: class extends self.ISpriteInstance {},
	Sprite2: class extends self.ISpriteInstance {},
	Sprite3: class extends self.ISpriteInstance {},
	musuh: class extends self.ISpriteInstance {},
	peluru: class extends self.ISpriteInstance {},
	Mouse: class extends self.IInstance {},
	txtScore: class extends self.ITextInstance {},
	musuh2: class extends self.ISpriteInstance {}
}