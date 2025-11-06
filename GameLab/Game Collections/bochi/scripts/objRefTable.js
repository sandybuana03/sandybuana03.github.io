const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.TiledBg,
		C3.Behaviors.solid,
		C3.Plugins.Sprite,
		C3.Behaviors.Platform,
		C3.Behaviors.scrollto,
		C3.Plugins.Keyboard,
		C3.Plugins.Text,
		C3.Plugins.Touch,
		C3.Plugins.Touch.Cnds.OnTapGestureObject,
		C3.Plugins.System.Acts.GoToLayout,
		C3.Plugins.Keyboard.Cnds.IsKeyDown,
		C3.Plugins.Sprite.Acts.SetMirrored,
		C3.Behaviors.Platform.Cnds.IsMoving,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Behaviors.Platform.Cnds.IsJumping,
		C3.Plugins.Sprite.Cnds.IsOutsideLayout,
		C3.Plugins.System.Acts.RestartLayout
	];
};
self.C3_JsPropNameTable = [
	{TiledBackground: 0},
	{Solid: 0},
	{tiled: 0},
	{TiledBackground2: 0},
	{TiledBackground3: 0},
	{Sprite: 0},
	{Sprite2: 0},
	{Platform: 0},
	{ScrollTo: 0},
	{Sprite3: 0},
	{Keyboard: 0},
	{TiledBackground4: 0},
	{Sprite4: 0},
	{Text: 0},
	{Text2: 0},
	{sp: 0},
	{Touch: 0},
	{regame: 0}
];

self.InstanceType = {
	TiledBackground: class extends self.ITiledBackgroundInstance {},
	tiled: class extends self.ITiledBackgroundInstance {},
	TiledBackground2: class extends self.ITiledBackgroundInstance {},
	TiledBackground3: class extends self.ITiledBackgroundInstance {},
	Sprite: class extends self.ISpriteInstance {},
	Sprite2: class extends self.ISpriteInstance {},
	Sprite3: class extends self.ISpriteInstance {},
	Keyboard: class extends self.IInstance {},
	TiledBackground4: class extends self.ITiledBackgroundInstance {},
	Sprite4: class extends self.ISpriteInstance {},
	Text: class extends self.ITextInstance {},
	Text2: class extends self.ITextInstance {},
	sp: class extends self.ISpriteInstance {},
	Touch: class extends self.IInstance {},
	regame: class extends self.ITextInstance {}
}