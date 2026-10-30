namespace $ {
	export function $mol_build2_test_assert< Value >( a: Value, b: Value ) {
		console.assert( a == b, `Not equal \n${ a }\n${ b }` )
	}
}
