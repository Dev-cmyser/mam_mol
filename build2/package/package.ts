namespace $ {

	/** Building MAM package */
	export class $mol_build2_package extends $mol_object2 {

		@ $mol_mem
		root() {
			return undefined as any as $mol_build2_root
		}

		@ $mol_mem
		dir() {
			return undefined as any as $mol_file
		}

		@ $mol_mem
		output( next?: $mol_file ) {
			return this.dir().resolve( '-' )
		}

		slice_classes() {
			return this.root().slice_classes()
		}

		@ $mol_mem_key
		slice< Slice extends typeof $mol_build2_slice >( Slice: Slice ) {
			const slice = new Slice
			slice.pack = $mol_const( this )
			return slice as InstanceType< Slice >
		}

		@ $mol_mem
		slices() {
			return this.slice_classes().map( ctor => this.slice( ctor ) )
		}

		@ $mol_mem
		bundles_generated() {
			const files = new Set< $mol_file >()

			for (const slice of this.slices()) {

				for (const file of slice.bundles_generated()) {
					files.add( file )
				}
				
			}

			return files
		}

		@ $mol_mem
		meta() {
			const decls = [] as $mol_tree2[]

			for( const file of this.dir().sub() ) {

				const tree = this.root().source([ this.$.$mol_build2_source_meta_tree, file ])?.tree()
				if( tree ) decls.push( ... tree.kids )

			}

			return $mol_tree2.list( decls )
		}

		@ $mol_mem
		ensure() {
			return this.root().ensure().ensure( this.dir().path() )
		}

	}

}
