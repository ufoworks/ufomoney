<template>
  <modal ref="print" @close="close">
    <div class="pr-10 pl-10 pb-10 pt-4" v-if="!$apollo.loading">
      <div class="flex justify-end" v-if="logoURL">
        <img :src="logoURL" class="w-24">
      </div>
      <div class="mb-6">
        <div class="font-brand font-bold">{{ $i18n('Presupuesto', lang) }}</div>
        <div class="font-brand font-bold text-4xl">{{ budget.name }}</div>
        <div>{{ budget.date | date }}</div>
      </div>
      <div class="mb-6">
        <div class="font-brand font-bold">{{ $i18n('Cliente', lang) }}</div>
        <div>{{ budget.client.name }}</div>
      </div>
      <div class="mb-6" v-if="budget.descrip">
        <div class="font-brand font-bold">{{ $i18n('Descripción', lang) }}</div>
        <div>{{ budget.descrip }}</div>
      </div>
      <div class="mb-6">
        <div class="flex justify-end items-end pb-4">
          <h2 class="w-3/4 font-brand font-bold">{{ $i18n('Concepto', lang) }}</h2>
          <strong class="w-1/4">{{ $i18n('Importe', lang) }}</strong>
        </div>
        <hr>
        <div v-for="task in budget.tasks" class="flex justify-end py-4" :key="task.id">
          <span class="block w-3/4">{{ task.name }}</span>
          <span class="block w-1/4">{{ task.amount | currency }}</span>
        </div>
        <hr>
        <div class="flex justify-end py-4">
          <span class="block w-3/4">
            <strong>{{ $i18n('Total (IVA no incluido)', lang) }}</strong>
          </span>
          <span class="block w-1/4">{{ budget.tasks | reduce('amount') | currency }}</span>
        </div>
      </div>
      <div class="mb-6" v-if="budget.timing">
        <div class="font-brand font-bold">{{ $i18n('Timing', lang) }}</div>
        <div>{{ budget.timing }}</div>
      </div>
      <div class="mb-6" v-if="budget.requeriments">
        <div class="font-brand font-bold">{{ $i18n('Material requerido', lang) }}</div>
        <div>{{ budget.requeriments }}</div>
      </div>
      <div class="mb-6" v-if="budget.compatibility">
        <div class="font-brand font-bold">{{ $i18n('Compatibilidad', lang) }}</div>
        <div>{{ budget.compatibility }}</div>
      </div>
      <div class="mb-6" v-if="budget.deliverables">
        <div class="font-brand font-bold">{{ $i18n('Entregables', lang) }}</div>
        <div>{{ budget.deliverables }}</div>
      </div>
      <div class="mb-6" v-if="budget.noinclusive">
        <div class="font-brand font-bold">{{ $i18n('No incluye', lang) }}</div>
        <div>{{ budget.noinclusive }}</div>
      </div>
      <br>
      <div class="font-brand font-bold">{{ $i18n('Condiciones del presupuesto', lang) }}</div>
      <div class="text-xs">
        <p class="my-3">{{ $i18n('Todos los proyectos o servicios que Nice Interactive S.L. provee al cliente están sujetos a lo siguiente:', lang) }}</p>
        <h4 class="font-bold">1. Inicio de proyecto</h4>
        <p class="my-3">Nice Interactive S.L. empezará a trabajar una vez haya sido aprobado el presupuesto por parte del cliente. Su aprobación supondrá un acuerdo entre ambas partes. Cualquier proyecto cancelado se facturará únicamente por las fases y/o fracciones de fases que ya hayan sido completadas por Nice Interactive S.L..</p>
        <p class="my-3">Modalidad de pago: 40% a la aceptación del presupuesto; 60% final a la entrega del proyecto, considerándose como tal la entrega de archivos definidos como entregables acordada en la planificación del proyecto independientemente de si el proyecto se publica por parte de cliente.</p>
        <h4 class="font-bold">2. Validez del presupuesto</h4>
        <p class="my-3">El presupuesto tiene validez de 30 días a partir de la fecha del mismo. Nice Interactive S.L. se reserva el derecho a cambios sobre la valoración económica de este presupuesto en caso de modificación sustancial de funcionalidad, contenido o características del proyecto descritas inicialmente. El cliente será notificado de cualquier modificación en el precio antes de su realización.</p>
        <p class="my-3">El presupuesto no contempla desarrollo de textos, sesiones fotográficas, de vídeo, audio, o derechos de imágenes o modelos o músicas, excepto los especificados en él. Tampoco incluye el hosting o mantenimiento técnico, excepto los especificados en el presupuesto, así como versionados a segundos o terceros idiomas si no son detallados en la valoración.</p>
        <p class="my-3">Nice Interactive S.L. se reserva el derecho de cancelación del proyecto ante cualquier modificación del trabajo realizado en el desarrollo por parte de terceros sin previo aviso o si no se cumplen los criterios acordados en la creación de este presupuesto.</p>
        <p class="my-3">El presupuesto incluye todas las tareas necesarias para testeo y puesta online. Tareas de mantenimiento y actualizaciones posteriores a la publicación serían presupuestadas con coste adicional.</p>
        <p class="my-3">No se incluye en ningún caso, la importación de contenido anteriores que pudiese tener el cliente hacia este nuevo proyecto o la introducción de contenido a través de gestores de contenido. Para ello se realizaría un presupuesto a medida.</p>
        <p class="my-3">La validez ortográfica y gramatical de los textos será siempre responsabilidad del cliente.<br/>No se incluye trabajos de SEO, redirecciones, SEM o cualquier otro tipo de servicio que no se exprese en este presupuesto.</p>
        <h4 class="font-bold">3. Revisiones y alteraciones</h4>
        <p class="my-3">Los cambios de criterio por parte de cliente durante el desarrollo se facturarán aparte. El nuevo trabajo encargado por el cliente y realizado por Nice Interactive S.L. después de aprobación de la propuesta será considerado revisión o alteración. Si el trabajo varía a un grado que altera sustancialmente las especificaciones descritas en el presupuesto original, Nice Interactive S.L. facilitará una memoria de la propuesta revisada, y se estimará por las dos partes un honorario adicional antes de proceder con el trabajo adicional. El cliente acepta preparar el material necesario (se entregará en formato digital) así como poder verificar fases intermedias del proceso de producción.</p>
        <p class="my-3">En caso de que el cliente detenga en algún momento la realización del proyecto por causas ajenas a Nice Interactive SL, no se reembolsará la cantidad pagada hasta el momento.</p>
        <h4 class="font-bold">4. Propiedad y funcionamiento</h4>
        <p class="my-3">Nice Interactive S.L. toma las medidas razonables para salvaguardar la propiedad del material que el cliente confía, así como mantener la confidencialidad del proyecto.</p>
        <p class="my-3">Si el cliente selecciona sus propios proveedores puede solicitarnos la coordinación del trabajo. En este caso, no somos responsables de la calidad, precio, desarrollo o entrega a tiempo de dichos proveedores.</p>
        <p class="my-3">Nice Interactive S.L. se reserva el derecho de fotografiar y/o distribuir o publicar el proyecto con objetivos promocionales, haciendo referencia en créditos al cliente salvo que este no lo desee expresamente.</p>
        <p class="my-3">Nice Interactive S.L. se reserva el derecho a almacenar el material digital utilizado para el trabajo. El producto final es propiedad del cliente, el código fuente y archivos originales son propiedad de Nice Interactive S.L.</p>
        <h4 class="font-bold">5. Plazos de entrega</h4>
        <p class="my-3">El retraso en la entrega del material necesario puede suponer un desajuste en la fecha de entrega final del proyecto. El presupuesto no incluye las traducciones a los distintos idiomas, salvo indicación expresa.</p>
        <p class="my-3">Nice Interactive S.L. no será responsable de los retrasos en la ejecución de las obligaciones derivadas de este presupuesto o interrupción del servicio, cuando estos sucedan por causas ajenas a su voluntad y no le sean imputables, tales como la no entrega de los materiales necesarios en tiempo y forma debidos, atendiendo a los plazos que se hayan establecido. Tampoco se hace responsable la misma de las perdidas o daños sufridos por el Cliente, directamente o indirectamente originados por errores en la ejecución de los servicios, de los programas, su documentación, la operativa o el uso de elementos no autorizados por Nice Interactive S.L..</p>
        <h4 class="font-bold">6. Gastos adicionales</h4>
        <p class="my-3">Los gastos generados durante el desarrollo de las actividades definidas en este presupuesto, por desplazamientos y viajes y/o aquellos derivados por la adquisición de recursos no cubiertos por Nice Interactive S.L. en esta oferta económica, serán adicionalmente facturados a su cuenta, cuya relación será presentada en presupuesto aparte para su aprobación.</p>
        <h4 class="font-bold">7. Responsabilidades</h4>
        <p class="my-3">Nice Interactive SL. no se hace responsable, en ningún caso, de requerimientos de cookies, tratamiento de información en general y el no cumplimiento del Reglamento General de Protección de Datos (Regulación 2016/679) y las posibles sanciones derivadas.</p>
        <p class="my-3">Los textos legales sobre política de privacidad u otros necesarios sobre la Ley de Protección de Datos serán facilitados por el cliente.</p>
        <p class="my-3">El desarrollo con plataformas externas e integraciones en redes sociales está sujeto a la aceptación por parte de cliente de las condiciones definidas en el uso de dichos servicios. Nice Interactive SL quedará eximida de cualquier responsabilidad económica, civil, penal o de cualquier otra índole derivados de los incumplimientos con las condiciones derivadas del uso de ellas.</p>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '../components/Modal'
import BUDGET_QUERY from '../graphql/Budget.gql'
import { getBackendURL } from '../utils/network'
export default {
  components: {
    Modal
  },
  props: ['id', 'lang', 'currency', 'taxes'],
  apollo: {
    budget: {
      query: BUDGET_QUERY,
      variables () {
        return {
          id: this.id
        }
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    logoURL () {
      return (this.user && this.user.logo) ? getBackendURL(this.user.logo.url) : null
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'budget-edit', params: { id: this.id } })
    }
  }
}
</script>

<style scoped>
.budget {

}
</style>
