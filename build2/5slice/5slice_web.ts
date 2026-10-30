namespace $ {

	export class $mol_build2_5slice_web extends $mol_build2_5slice {

		filter( file: $mol_file ) {
			if( !super.filter( file ) ) return false
			if( /\.node\./.test( file.name() ) ) return false
			return true
		}

		prefix() {
			return 'web'
		}

		@ $mol_mem
		bundle_classes(): ( typeof $mol_build2_6bundle )[] {
			return [
				...super.bundle_classes(),
				this.$.$mol_build2_6bundle_css,
			]
		}

	}

	export class $mol_build2_5slice_web_prod extends $mol_build2_5slice_web {

		filter( file: $mol_file ) {
			if( !super.filter( file ) ) return false
			if( /\.(test|dev)\./.test( file.name() ) ) return false
			return true
		}
		
	}

	export class $mol_build2_5slice_web_test extends $mol_build2_5slice_web {

		prefix() {
			return 'web.test'
		}

		bundle_classes() {
			return this.root().bundle_test_classes()
		}
		
		filter( file: $mol_file ) {
			if( !super.filter( file ) ) return false
			return true
		}

		// @ $mol_mem
		// files() {
			
		// 	const all = super.files()
		// 	const prod = this.pack().slice( this.$.$mol_build2_5slice_web_prod ).files()
			
		// 	const test = new Set< $mol_file >()

		// 	for( const file of all ) {
		// 		if( prod.has( file ) ) continue
		// 		test.add( file )
		// 	}

		// 	return test
		// }

	}

}
