namespace $ {

	function sources( name: string, Slice: typeof $mol_build2_5slice ) {
		const root = new $mol_build2_2root
		const ensure = new $mol_build2_3ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		return [ ... pack.slice( Slice ).files() ]
			.filter( file => /\/fixture\/.*\.ts$/.test( file.path() ) )
			.map( file => file.name() )
	}

	$mol_test({

		'web slice skips node sources'() {
			$mol_assert_equal( sources( 'env', $mol_build2_5slice_web_prod ), [ 'env.ts', 'env.web.ts' ] )
		},

		'node slice skips web sources'() {
			$mol_assert_equal( sources( 'env', $mol_build2_5slice_node_prod ), [ 'env.ts', 'env.node.ts' ] )
		},

		'prod slice skips dev and test sources'() {
			$mol_assert_equal( sources( 'stage', $mol_build2_5slice_node_prod ), [ 'stage.ts' ] )
		},

		'test slice takes dev and test sources'() {
			$mol_assert_equal( sources( 'stage', $mol_build2_5slice_node_test ), [ 'stage.ts', 'stage.dev.ts', 'stage.test.ts' ] )
		},

		'dependency goes before dependent'() {
			$mol_assert_equal( sources( 'branch', $mol_build2_5slice_node_prod ), [ 'leaf.ts', 'branch.ts' ] )
		},

		'cycle breaks on weaker nested reference'() {
			$mol_assert_equal( sources( 'cycle/one', $mol_build2_5slice_node_prod ), [ 'two.ts', 'one.ts' ] )
			$mol_assert_equal( sources( 'cycle/two', $mol_build2_5slice_node_prod ), [ 'two.ts', 'one.ts' ] )
		},

	})

}
