namespace $ {

	$mol_test({

		'view tree compiles into js bundle'() {
			const pack = $mol_build2_4package_fixture( 'view' )
			const slice = pack.slice( $mol_build2_5slice_node_prod )
			const script = pack.root().bundle( $mol_build2_6bundle_js ).artifacts( slice ).find( file => file.name() === 'node.js' )!
			$mol_assert_equal( /class \$?mol_build2_fixture_view\b/.test( script.text() ), true )
			$mol_assert_equal( script.text().includes( 'build2 view fixture' ), true )
		},

	})

}
