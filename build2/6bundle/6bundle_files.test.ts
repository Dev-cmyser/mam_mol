namespace $ {

	$mol_test({

		'deploy copies listed files'() {
			const pack = $mol_build2_4package_fixture( 'build' )
			const slice = pack.slice( $mol_build2_5slice_web_prod )
			const copied = pack.root().bundle( $mol_build2_6bundle_files ).artifacts( slice )
			const target = copied.find( file => /fixture\/build\/static\.txt$/.test( file.path() ) )
			$mol_assert_equal( target?.text(), 'deploy-ok\n' )
		},

	})

}
