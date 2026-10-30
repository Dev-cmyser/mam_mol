namespace $ {

	/** Makes one bundle from all required sources. */
	export class $mol_build2_bundle extends $mol_object2 {
		
		@ $mol_mem
		root() {
			return undefined as any as $mol_build2_root
		}
		
		/** Artifacts shared by all slices of pack */
		@ $mol_mem_key
		pack_artifacts( pack: $mol_build2_package ) {
			return [] as $mol_file[]
		}

		/** Artifacts specific to a slice */
		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_slice ) {
			return [] as $mol_file[]
		}

		@ $mol_mem_key
		artifacts( slice: $mol_build2_slice ) {
			return [
				... this.pack_artifacts( slice.pack() ),
				... this.slice_artifacts( slice ),
			]
		}

		log( target: $mol_file, duration: number ) {

			const path = target.relate( this.root().dir() )
			
			this.$.$mol_log3_done({
				place: this,
				duration: `${duration}ms`,
				message: `Built`, 
				path,
			})

		}

		js_bootstrap() {
			return this.root().dir().resolve( 'mam.jam.js' ).text()
		}
		
	}

}
