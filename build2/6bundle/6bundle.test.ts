namespace $ {

	function artifacts( name: string, Bundle: typeof $mol_build2_6bundle, Slice: typeof $mol_build2_5slice ) {
		const root = new $mol_build2_2root
		const ensure = new $mol_build2_3ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		return root.bundle( Bundle ).artifacts( pack.slice( Slice ) )
	}

	function npm_deps( name: string ) {
		const root = new $mol_build2_2root
		const ensure = new $mol_build2_3ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		const pack = root.pack( root.dir().resolve( `mol/build2/fixture/${ name }` ) )
		const target = pack.dir().resolve( 'package.json' )
		$node.fs.rmSync( target.path(), { force: true } )
		const bundle = root.bundle( $mol_build2_6bundle_npm_deps )
		bundle.repo_dir = ()=> pack.dir()
		bundle.pack_artifacts( pack )
		if( !target.exists() ) return null
		return Object.keys( JSON.parse( target.text() ).dependencies )
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

		'package json lists only npm packages of own sources'() {
			$mol_assert_equal( npm_deps( 'npm/app' ), [ 'typescript' ] )
		},

		'package json not created without own npm packages'() {
			$mol_assert_equal( npm_deps( 'npm/bare' ), null )
		},

	})

}
