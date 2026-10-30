namespace $ {

	function artifacts( name: string, Bundle: typeof $mol_build2_6bundle, Slice: typeof $mol_build2_5slice ) {
		const root = new $mol_build2_2root
		const ensure = new $mol_build2_3ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		return root.bundle( Bundle ).artifacts( pack.slice( Slice ) )
	}

	$mol_test({

		'view tree compiles into js bundle'() {
			const script = artifacts( 'view', $mol_build2_6bundle_js, $mol_build2_5slice_node_prod ).find( file => file.name() === 'node.js' )
			$mol_assert_equal( /class \$?mol_build2_fixture_view\b/.test( script?.text() ?? '' ), true )
			$mol_assert_equal( script?.text().includes( 'build2 view fixture' ), true )
		},

		'deploy copies listed files'() {
			const copied = artifacts( 'build', $mol_build2_6bundle_files, $mol_build2_5slice_web_prod )
			const target = copied.find( file => /fixture\/build\/static\.txt$/.test( file.path() ) )
			$mol_assert_equal( target?.text(), 'deploy-ok\n' )
		},

	})

}
