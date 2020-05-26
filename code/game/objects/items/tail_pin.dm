/obj/item/tail_pin
	icon_state = "tailpin"
	name = "tail pin"
	desc = "Offically branded 'pin the tail on the corgi' style party implement. Not intended to be used on people."
	force = 0
	w_class = WEIGHT_CLASS_SMALL
	throwforce = 0
	throw_speed = 1
	embedding = EMBED_HARMLESS
	custom_materials = list(/datum/material/iron=1000)
	hitsound = 'sound/weapons/bladeslice.ogg'
	attack_verb = list("poked", "jabbed", "pinned the tail on")
	sharpness = IS_SHARP
	max_integrity = 200
	layer = 3.41 //Little trick to always stick itself above the poster.

/obj/item/poster/tail_board
	name = "party game poster"
	poster_type = /obj/structure/sign/poster/party_game
	icon_state = "rolled_poster"

/obj/structure/sign/poster/party_game
	name = "pin the tail on the corgi"
	desc = "The rules are simple, pin the tail on the dog, while blindfolded. Are you a bad enough dude to hit the target?"
	icon_state = "pinningposter"

/obj/structure/sign/poster/party_game/attackby(obj/item/I, mob/user, params)
	. = ..()
	if(istype(I,/obj/item/tail_pin))
		if(user.a_intent != INTENT_HARM && !(I.item_flags & ABSTRACT)) //We're using the same trick that tables use for placing objects x and y onto the click location.
			if(user.transferItemToLoc(I, drop_location(), silent = FALSE))
				var/list/click_params = params2list(params)
				if(!click_params || !click_params["icon-x"] || !click_params["icon-y"])
					return
				I.pixel_x = clamp(text2num(click_params["icon-x"]) - 16, -(world.icon_size/2), world.icon_size/2)
				I.pixel_y = clamp(text2num(click_params["icon-y"]) - 16, -(world.icon_size/2), world.icon_size/2)
				return TRUE
	else
		return ..()
