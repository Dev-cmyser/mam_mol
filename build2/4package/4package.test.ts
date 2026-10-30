namespace $ {

	export function $mol_build2_4package_fixture( name: string ) {
		const root = new $mol_build2_2root
		const ensure = new $mol_build2_3ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		return root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
	}

}
