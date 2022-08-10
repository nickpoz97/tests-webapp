package org.univr.webapp.config.DbConfig;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "loginEntityManagerFactory",
        transactionManagerRef = "loginTransactionManager",
        basePackages = {"org.univr.webapp.dataAccessLayer.webappLogin", "org.univr.webapp.model.webappLogin"}
)
public class WebappLoginConfig {
    @Bean(name= "loginDataSource")
    @ConfigurationProperties(prefix="spring.dslogin")
    public DataSource loginDatasource(){
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "loginEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean loginDbEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("loginDataSource") DataSource loginDataSource
    ){
        return builder
                .dataSource(loginDataSource)
                .packages("org.univr.webapp.dataLayer.webappLogin", "org.univr.webapp.model.webappLogin")
                .build();
    }

    @Bean(name= "loginTransactionManager")
    public PlatformTransactionManager loginDbTransactionManager(
            @Qualifier("loginEntityManagerFactory") EntityManagerFactory loginDbEntityManagerFactory
    ){
        return new JpaTransactionManager(loginDbEntityManagerFactory);
    }
}
