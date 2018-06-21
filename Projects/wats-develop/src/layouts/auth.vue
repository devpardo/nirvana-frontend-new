<template>
  <q-layout view="hHh Lpr fFr">
    <q-layout-header>
      <q-toolbar glossy>
        <q-btn glossy round dense icon="menu" @click="drawer.left = !drawer.left" />
        <q-toolbar-title>
          <a href="#" class="al-logo clearfix">
            <span>STP</span>Central</a>
        </q-toolbar-title>
        <q-btn v-if="auth.type === 'p'" round icon="people" class="q-mr-xs">
          <q-chip class="custom-chip" floating color="secondary">
            {{auth.children.length}}
          </q-chip>
        </q-btn>
        <img :src="auth.image" alt="" class="avatar">
        <q-btn glossy round icon="exit_to_app" @click="logout"></q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer side="left" behavior="desktop" :value="true" :content-class="[drawer.left ? 'q-drawer-mini' : '','bg-primary text-white']" @click.native="drawer.left = false">
      <q-list no-border link inset-delimiter class="non-selectable">
        <template v-for="(link,key,index) of links">
          <q-item v-if="!link.children" :key="`${link.name}-${index}`" :to="link.to" dark link>
            <q-item-side v-if="link.icon" :icon="link.icon" />
            <q-item-main :label="link.label" />
          </q-item>
          <q-collapsible v-else :key="`${link.name}-${index}`" :content-class="'side-collapsible'" indent icon="explore" :label="link.label" :opened="!drawer.left">
            <q-item class="sub-item" v-for="(link,index) of link.children" :key="`${link.name}-${index}`" :to="link.to" dark link>
              <q-item-side v-if="link.icon" :icon="link.icon" />
              <q-item-main :label="link.label | capitalizeFirst" />
            </q-item>
          </q-collapsible>
        </template>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <div class="q-layout-page layout-padding student-info">
        Hello, Tyler John 4-J 
        <q-btn glossy color="secondary" size="md" class="btn-info">Student Profile</q-btn>
        <div class="pull-right">
          <q-btn glossy color="warning" size="md" class="btn-info">55 Days Present</q-btn>
          <q-btn glossy color="info" size="md" class="btn-info">5 Days Absent</q-btn>
          <q-btn glossy color="tertiary" size="md" class="btn-info">3 Days Late</q-btn>
        </div>
      </div>
      <transition appear mode="out-in" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <router-view :key="$route.fullPath" />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'LayoutName',
  data() {
    return {
      drawer: {
        left: this.$q.platform.is.desktop
      },
      links: {
        overview: {
          label: "Overview",
          to: {
            name: "overview"
          },
          icon: "dashboard"
        },
        subjects: {
          label: "Subjects",
          icon: "book",
          children: []
        },
        directory: {
          label: "Directory",
          icon: "book",
          children: [
            {
              label: "Classmates",
              to: {
                name: "classmates"
              }
            },
            {
              label: "Teachers",
              to: {
                name: "teachers"
              }
            },
            {
              label: "Staff",
              to: {
                name: "staff"
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    ...mapGetters(["auth"]),
    isDesktop() {
      return this.$q.platform.is.desktop;
    }
  },
  methods: {
    openURL,
    ...mapActions(["logout"])
  },
  async mounted() {
    const { data: subjects } = await this.$axios({
      method: "get",
      url: `http://stpcentral.net/subjects/sidemenu/4-J`
    });
    this.links.subjects.children = subjects.map(subject => {
      const link = {
        label: subject.subject,
        to: {
          name: "subject",
          params: {
            id: subject.subject.replace(" ", "_")
          }
        }
      };
      return link;
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~variables';

.router-link-active, .q-item:focus {
  background: $secondary;
}

.student-info {
  font-weight: 700;
  color: #666;
  margin: 0;
  padding: 0 2em;
  padding-top: 1em;
  padding-bottom: 0.5em;
  font-size: 24px;
  opacity: 0.9;
}

.btn-info {
  margin: 0 2px;
}

a.al-logo {
  color: #fff;
  display: block;
  font-size: 24px;
  font-family: Roboto, sans-serif;
  white-space: nowrap;
  float: left;
  line-height: 60px;
  text-decoration: none;
  transition: color 0.2s ease;
}

a.al-logo span {
  color: #209e91;
}

a:hover {
  color: #1b867b;
}

.q-item, .q-item-label {
  transition: color 0.2s ease;
  font-size: 13px;
}

.q-item, .q-item-label {
  transition: color 0.2s ease;
  font-size: 13px;
}

.q-item::first-letter, .q-item-label::first-letter {
  color: red;
}

.q-item-link:hover {
  background: transparent;
}

.q-item:hover {
  background: transparent;
  color: #1b867b;
}

.q-icon {
  color: #1b867b;
}

.sub-item {
  padding-left: 52px;
}

.sub-item::first-letter {
  text-transform: uppercase;
}

img.avatar {
  width: 45px;
  height: 45px;
  margin: 0 15px;
}
</style>
