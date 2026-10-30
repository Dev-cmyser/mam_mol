namespace $ {

	/** Source file transpiler. */
	export class $mol_build2_8convert extends $mol_object2 {

		static match( file: $mol_file ): boolean {
			return false
		}

		root(): $mol_build2_2root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		source(): $mol_file {
			return $mol_fail( new Error( 'source is not set' ) )
		}

		@ $mol_mem
		generated_artifacts(): $mol_file[] {
			return []
		}

		/** Will be included in further processing (converting, deps searching) */
		@ $mol_mem
		generated_sources(): $mol_file[] {
			return []
		}

		artifacts_for( slice: $mol_build2_5slice ): $mol_file[] {
			return this.generated_artifacts()
		}

	}

}
